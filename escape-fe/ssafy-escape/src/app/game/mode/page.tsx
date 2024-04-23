"use client"

import Container from "../../../components/common/Container"
import "./style.css"
import { useRouter } from "next/navigation"
const GamePage = () => {
  const router = useRouter()
  return (
    <Container>
      <h1>모드 선택</h1>
      <main>
        <div
          className="selectmode"
          onClick={() => {
            router.push("/game/theme")
          }}
        >
          <img src="/image/single.png" />
          <p>
            싱글
            <br />
            (1인)
          </p>
        </div>
        <div
          className="selectmode"
          onClick={() => {
            router.push("/game/multi")
          }}
        >
          <img src="/image/multi.png" />
          <p>
            멀티
            <br />
            (2인)
          </p>
        </div>
      </main>
    </Container>
  )
}
export default GamePage
