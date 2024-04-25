import Container from "@/components/common/Container"
import * as S from "./enterStyle"
import Room from "./Room"

const Page = () => {
  // 더미 데이터. 추후 방 데이터 받아올 예정
  const data: RoomInfo[] = [
    {
      roomUuid: "123",
      thema: "공포",
      nickname: "오희주",
      isStarted: false,
      title: "희주야 들어와 제발 이제는 좀",
      capacity: 2,
    },
    {
      roomUuid: "123",
      thema: "싸피",
      nickname: "오희주",
      isStarted: false,
      title: "희주야 들어와 제발",
      capacity: 2,
    },
    {
      roomUuid: "123",
      thema: "일반",
      nickname: "오희주",
      isStarted: false,
      title: "희주야 들어와 제발",
      capacity: 1,
    },
  ]
  return (
    <Container>
      <S.RoomContainer>
        {data.map((room: RoomInfo) => (
          <Room key={room.roomUuid} roomData={room} />
        ))}
      </S.RoomContainer>
    </Container>
  )
}

export default Page
