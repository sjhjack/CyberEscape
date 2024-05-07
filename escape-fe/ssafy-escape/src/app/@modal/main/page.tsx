import { getQueryClient } from "@/hooks/getQueryClient"
import Main from "@/components/main/myhome/Main"
import postMyRanking from "@/services/main/ranking/postMyRanking"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

const Page = async () => {
  const userUuid = "임시"
  const themeuuids = ["공포uuid", "싸피uuid", "일반uuid"]
  const queryClient = getQueryClient()
  await Promise.all(
    themeuuids.map((themeuuid) =>
      queryClient.prefetchQuery({
        queryKey: ["myRanking", themeuuid],
        queryFn: () => postMyRanking(userUuid, themeuuid),
      }),
    ),
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Main />
    </HydrationBoundary>
  )
}

export default Page
