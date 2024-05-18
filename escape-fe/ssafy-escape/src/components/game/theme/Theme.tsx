"use client"

import { useRouter } from "next/navigation"
import Container from "@/components/common/Container"
import ThemeCarousel from "@/components/common/ThemeCarousel"
import Button from "@/components/common/Button"
import Swal from "sweetalert2"
import useIngameThemeStore from "@/stores/IngameTheme"

const Theme = () => {
  const router = useRouter()
  const { selectedThemeType } = useIngameThemeStore()

  const gameStart = (): void => {
    if (selectedThemeType === "single") {
      Swal.fire({
        title: "게임을 시작합니다.",
        width: "500px",
        padding: "40px",
      })
      router.push("/ingame")
    } else {
      alert("잘못된 접근입니다. ")
      router.push("mode")
    }
  }
  return (
    <Container
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      backgroundColor="none"
    >
      <h1 style={{ margin: "0" }}>테마 선택</h1>
      <ThemeCarousel
        width={550}
        height={350}
        navigation={true}
        pagination={false}
      />
      <Button
        theme="game"
        width="200px"
        height="40px"
        text="시작하기"
        onClick={() => {
          console.log("게임시작")
          gameStart()
        }}
      ></Button>
      <div></div>
    </Container>
  )
}
export default Theme
