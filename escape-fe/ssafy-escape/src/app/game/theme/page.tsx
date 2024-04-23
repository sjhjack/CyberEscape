"use client"
import React, { useState, useEffect, use } from "react"
import Container from "../../../components/common/Container"
import { useRouter } from "next/navigation"
import Carousel from "./carousel"
export interface CardInfoProp {
  title: string
  time: string
  content: string
  image: string
}
const Page = () => {
  const themeData = [
    {
      title: "공포",
      time: "10-15분",
      content: "무서운 거임",
      image: "/image/horror.jpg",
    },
    {
      title: "SSAFY",
      time: "10-15분",
      content: "탈출 마렵다",
      image: "/image/ssafy.jpg",
    },
    {
      title: "일반",
      time: "10-15분",
      content: "희주야 들어와",
      image: "/image/normal.jpg",
    },
  ]
  const router = useRouter()
  const [theme, selectTheme] = useState<number>(0)

  return (
    <Container>
      <h1>테마 선택</h1>
      <Carousel selectTheme={selectTheme} data={themeData} />
      <button
        onClick={() => {
          console.log("게임시작", themeData[theme])
        }}
      >
        시작하기
      </button>
    </Container>
  )
}
export default Page
