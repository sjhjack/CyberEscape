"use client"

import { useEffect, useState } from "react"
import CountdownTimer from "@/components/ingame/CountdownTimer"
import Chat from "@/components/ingame/Chat"
import ExitGame from "@/components/ingame/ExitGame"
import ProgressBar from "@/components/ingame/ProgressBar"
import Image from "next/image"
import * as S from "./ingameStyle"
import SpaceTheme from "../../components/ingame/main/space/SpaceTheme"
// import StartingCountDown from "@/components/ingame/StartingCountDown"
import HorrorTheme from "@/components/ingame/main/horror/HorrorTheme"
import SsafyTheme from "@/components/ingame/main/ssafy/SsafyTheme"
import useIngameThemeStore from "@/stores/IngameTheme"
import StartScene from "@/components/ingame/StartScene"

const Page = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const { selectedTheme } = useIngameThemeStore()

  const onStartClick = () => {
    const canvas = document.querySelector("canvas")
    if (canvas && !document.pointerLockElement) {
      canvas.requestPointerLock()
    }
  }

  const handleGameStart = () => {
    setIsGameStart(true)
  }

  useEffect(() => {
    document.addEventListener("click", onStartClick)
  }, [])

  return (
    <S.Container>
      {/* 멀티인지 확인 후 수정*/}
      {selectedTheme === "3" ? (
        <SpaceTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === "1" ? (
        <HorrorTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === "2" ? (
        <SsafyTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : null}

      {isModelLoaded && !isGameStart ? (
        // <StartingCountDown
        //   isModelLoaded={isModelLoaded}
        //   onFinish={handleGameStart}
        // />
        <StartScene onFinish={handleGameStart} />
      ) : null}
      {/* 멀티인지 확인 후 표시 여부 수정*/}
      {isModelLoaded ? (
        <div>
          {/* <StartingCountDown
            isModelLoaded={isModelLoaded}
            onFinish={handleGameStart}
          /> */}
          <Chat />
          <ProgressBar id1={"오희주"} id2={"김병주"} value1={30} value2={40} />
          <ExitGame>
            <Image
              src="/image/exitbutton.png"
              alt="exit game image"
              width="40"
              height="40"
            />
          </ExitGame>
        </div>
      ) : (
        <S.LoadingText>로딩 중...</S.LoadingText>
      )}
      {isGameStart ? (
        <div>
          <CountdownTimer />
        </div>
      ) : null}
    </S.Container>
  )
}

export default Page
