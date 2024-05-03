"use client"
import React, { useState } from "react"
import Container from "@/components/common/Container"
import { useRouter, useSearchParams } from "next/navigation"
import ThemeCarousel from "@/components/common/ThemeCarousel"
const Theme = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const mode: string | null = searchParams.get("mode")
  const gameStart = (): void => {
    if (mode === "single") {
      alert("게임을 시작합니다.")
      router.push("/ingame")
    } else if (mode === "multi") {
      alert("매칭을 시작합니다.")
      router.push("multi/random")
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
    >
      <h1>테마 선택</h1>
      <ThemeCarousel
        width={500}
        height={350}
        navigation={true}
        pagination={false}
      />
      <button
        onClick={() => {
          console.log("게임시작")
          gameStart()
        }}
      >
        시작하기
      </button>
    </Container>
  )
}
export default Theme
