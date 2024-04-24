import * as S from "./enterStyle"
import { RoomInfo } from "@/interfaces/interface"
import Image from "next/image"
interface RoomProps {
  roomData: RoomInfo
}

const Page = ({ roomData }: RoomProps) => {
  return (
    <S.RoomBox>
      <Image
        src={`/image/${roomData.thema}.png`}
        alt=""
        width={70}
        height={70}
      />
      <S.Title>{roomData.title}</S.Title>
      <S.Menu>인원: {roomData.capacity}/2</S.Menu>
      <S.Menu>방장: {roomData.nickname}</S.Menu>
      <S.Menu>테마: {roomData.thema}</S.Menu>
    </S.RoomBox>
  )
}

export default Page
