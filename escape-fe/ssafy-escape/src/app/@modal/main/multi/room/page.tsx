import { getQueryClient } from "@/hooks/getQueryClient"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import getRoomList from "@/services/game/room/getRoomList"
import Room from "@/components/game/multi/room/Room"

const Page = () => {
  // const [page, setPage] = useState<number>(1)
  // const [keyword, setKeyword] = useState<string>("")
  const queryClient = getQueryClient()
  const initialData = { page: 1, keyword: "" }
  queryClient.prefetchQuery({
    queryKey: ["roomList"],
    queryFn: () => getRoomList(initialData),
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Room />
    </HydrationBoundary>
  )
}

export default Page
