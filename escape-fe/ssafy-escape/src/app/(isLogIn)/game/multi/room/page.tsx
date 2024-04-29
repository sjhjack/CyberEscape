import Enter from "@/components/game/multi/room/Room"
import { useQuery } from "@tanstack/react-query"
import getRoomList from "@/services/game/room/getRoomList"
const Page = () => {
  const { data: roomData, isLoading } = useQuery({
    queryKey: ["roomList"],
    queryFn: getRoomList,
  })
  if (isLoading) {
    return <div>로딩 중</div>
  }
  return <Enter data={roomData} />
}

export default Page
