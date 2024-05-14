import { getQueryClient } from "@/hooks/getQueryClient"
import Main from "@/components/main/myhome/Main"
import postMyRanking from "@/services/main/ranking/postMyRanking"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

const Page = async () => {
  const themeIdx = [1, 4, 7]
  const queryClient = getQueryClient()
  await Promise.all(
    themeIdx.map((idx) =>
      queryClient.prefetchQuery({
        queryKey: ["myRanking", idx],
        queryFn: () => postMyRanking(idx),
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
