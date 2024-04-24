"use client"

import Container from "../../../components/common/Container"
import { useRouter } from "next/navigation"
import * as S from "./modeStyle"
import Image from "next/image"
const Page = () => {
  const router = useRouter()
  return (
    <Container>
      <h1>모드 선택</h1>
      <S.MainContent>
        <S.SelectMode
          className="selectmode"
          onClick={() => {
            router.push("/game/theme")
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
            router.push("/game/multi")
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
export default Page
