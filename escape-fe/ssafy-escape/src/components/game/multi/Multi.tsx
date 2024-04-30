"use client"

import Container from "@/components/common/Container"
import { useRouter } from "next/navigation"
import * as S from "@/app/(isLogIn)/game/multi/mulitStyle"
const Multi = () => {
  const router = useRouter()
  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
    >
      <S.Title>멀티 모드</S.Title>
      <div></div>
      <div></div>
      <S.ImageContainer>
        <S.MenuContainer
          onClick={() => {
            router.push("/game/multi/create")
          }}
        >
          <S.MultiImage
            src="/image/createroom.png"
            alt="create the room"
            width={200}
            height={200}
          />
          <S.MenuText>방 생성</S.MenuText>
        </S.MenuContainer>
        <S.MenuContainer
          onClick={() => {
            router.push("/game/multi/room")
          }}
        >
          <S.MultiImage
            src="/image/enter.png"
            alt="enter the room"
            width={200}
            height={200}
          />
          <S.MenuText>방 찾기</S.MenuText>
        </S.MenuContainer>
        <S.MenuContainer>
          <S.MultiImage
            src="/image/random.png"
            alt="random matching"
            width={200}
            height={200}
          />
          <S.MenuText>랜덤 매칭</S.MenuText>
        </S.MenuContainer>
      </S.ImageContainer>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  )
}
export default Multi
