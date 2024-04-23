"use client"

import Container from "../../../components/common/Container"
import { useRouter } from "next/navigation"
import * as S from "./mulitStyle"
const GamePage = () => {
  const router = useRouter()
  return (
    <Container>
      <h1>멀티 모드</h1>
      <S.ImageContainer>
        <S.MultiImage
          src="/image/createroom.png"
          alt="create the room"
          width={200}
          height={200}
        />
        <S.MultiImage
          src="/image/enter.png"
          alt="enter the room"
          width={200}
          height={200}
        />
        <S.MultiImage
          src="/image/random.png"
          alt="random matching"
          width={200}
          height={200}
        />
      </S.ImageContainer>
    </Container>
  )
}
export default GamePage
