"use client"
import React, { useState } from "react"
import Container from "@/components/common/Container"
import { useRouter } from "next/navigation"
import Carousel from "@/components/common/ThemeCarousel"
const Page = () => {
  const router = useRouter()
  const [theme, selectTheme] = useState<number>(0)

  return (
    <Container>
      <h1>테마 선택</h1>
      <Carousel selectTheme={selectTheme} />
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
export default Page
