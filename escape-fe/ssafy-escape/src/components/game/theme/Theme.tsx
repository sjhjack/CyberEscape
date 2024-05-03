"use client"
import React, { useState } from "react"
import Container from "@/components/common/Container"
import { useRouter } from "next/navigation"
import ThemeCarousel from "@/components/common/ThemeCarousel"
const Theme = () => {
  const router = useRouter()
  const [theme, selectTheme] = useState<string>("")

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
    >
      <h1>테마 선택</h1>
      <ThemeCarousel
        selectTheme={selectTheme}
        width={500}
        height={350}
        navigation={true}
        pagination={false}
      />
      <button
        onClick={() => {
          console.log("게임시작", theme)
        }}
      >
        시작하기
      </button>
    </Container>
  )
}
export default Theme
