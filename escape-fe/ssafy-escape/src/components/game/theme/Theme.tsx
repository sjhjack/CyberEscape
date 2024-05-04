"use client"
import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Container from "@/components/common/Container"
import ThemeCarousel from "@/components/common/ThemeCarousel"
import Button from "@/components/common/Button"
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
      <div></div>
      <Button
        theme="game"
        width="200px"
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
