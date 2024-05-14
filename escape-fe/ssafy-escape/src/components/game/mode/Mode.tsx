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
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      backgroundColor="none"
    >
      <h1>모드 선택</h1>
      <S.MainContent>
        <S.SelectMode
          className="selectmode"
          onClick={() => {
            router.push("theme"), setSelectedThemeType("multi")
          }}
        >
          <Image src="/image/single.png" alt="" width={300} height={300} />
          <S.Text>
            싱글
            <br />
            (1인)
          </S.Text>
        </S.SelectMode>
        <S.SelectMode
          className="selectmode"
          onClick={() => {
            router.push("/main/multi"), setSelectedThemeType("single")
          }}
        >
          <Image src="/image/multi.png" alt="" width={300} height={300} />
          <S.Text>
            멀티
            <br />
            (2인)
          </S.Text>
        </S.SelectMode>
      </S.MainContent>
    </Container>
  )
}
export default Mode
