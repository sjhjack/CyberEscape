import { getQueryClient } from "@/hooks/getQueryClient"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import getRoomList from "@/services/game/room/getRoomList"
import Room from "@/components/game/multi/room/Room"

const Page = () => {
  const queryClient = getQueryClient()
  queryClient.prefetchQuery({
    queryKey: ["roomList"],
    queryFn: () => getRoomList(),
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Room />
    </HydrationBoundary>
  )
}

export default Page
