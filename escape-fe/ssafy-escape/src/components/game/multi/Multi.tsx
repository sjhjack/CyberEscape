"use client"

import Container from "@/components/common/Container"
import { useRouter } from "next/navigation"
import * as S from "@/app/@modal/main/multi/mulitStyle"
const Multi = () => {
  const router = useRouter()

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      backgroundColor="none"
    >
      <S.Title>멀티 모드</S.Title>
      <div></div>
      <div></div>
      <S.ImageContainer>
        <S.MenuContainer
          onClick={() => {
            router.push("/main/multi/create")
          }}
        >
          <S.MultiImage
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/createroom.png"}
            alt="create the room"
            width={200}
            height={200}
          />
          <S.MenuText>방 생성</S.MenuText>
        </S.MenuContainer>
        <S.MenuContainer
          onClick={() => {
            router.push("/main/multi/room")
          }}
        >
          <S.MultiImage
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/enter.png"}
            alt="enter the room"
            width={200}
            height={200}
          />
          <S.MenuText>방 찾기</S.MenuText>
        </S.MenuContainer>
        <S.MenuContainer
          onClick={() => {
            router.push("/main/multi/random")
          }}
        >
          <S.MultiImage
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/random.png"}
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
