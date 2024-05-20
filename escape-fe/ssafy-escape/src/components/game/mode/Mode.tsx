"use client"

import Container from "@/components/common/Container"
import { useRouter } from "next/navigation"
import * as S from "@/app/@modal/main/mode/modeStyle"
import Image from "next/image"
import useIngameThemeStore from "@/stores/IngameTheme"
const Mode = () => {
  const router = useRouter()
  const { setSelectedThemeType } = useIngameThemeStore()
  return (
    <Container
      display="flex"
      alignItems="center"
      flexDirection="column"
      backgroundColor="none"
      gap="50px"
    >
      <h1 style={{ margin: "0" }}>모드 선택</h1>
      <S.MainContent>
        <S.SelectMode
          className="selectmode"
          onClick={() => {
            router.push("theme"), setSelectedThemeType("single")
          }}
        >
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/single.png"}
            alt=""
            width={300}
            height={300}
          />
          <S.Text>싱글(1인)</S.Text>
        </S.SelectMode>
        <S.SelectMode
          className="selectmode"
          onClick={() => {
            router.push("/main/multi"), setSelectedThemeType("multi")
          }}
        >
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/multi.png"}
            alt=""
            width={300}
            height={300}
          />
          <S.Text>멀티(2인)</S.Text>
        </S.SelectMode>
      </S.MainContent>
    </Container>
  )
}
export default Mode
