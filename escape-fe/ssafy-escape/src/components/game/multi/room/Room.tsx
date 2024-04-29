import Container from "@/components/common/Container"
import * as S from "../../../../app/(isLogIn)/game/multi/room/roomStyle"
import Room from "./RoomList"

const Enter = ({ data }: any) => {
  // 더미 데이터. 추후 방 데이터 받아올 예정

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {data.map((room: RoomInfo) => (
        <Room key={room.roomUuid} roomData={room} />
      ))}
    </Container>
  )
}

export default Enter
