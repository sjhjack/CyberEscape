"use client"

import { useEffect, useState } from "react"
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
import HorrorTheme2 from "@/components/ingame/main/horror2/HorrorTheme2"
import SsafyTheme2 from "@/components/ingame/main/ssafy2/SsafyTheme2"
const Page = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const { selectedTheme, selectedThemeType } = useIngameThemeStore()

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
      {selectedTheme === 7 ? (
        <SpaceTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 1 || selectedTheme === 2 ? (
        <HorrorTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 4 || selectedTheme === 5 ? (
        <SsafyTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 3 ? (
        <HorrorTheme2
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === 6 ? (
        <SsafyTheme2
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : null}

      {isModelLoaded && !isGameStart ? (
        // <StartingCountDown
        //   isModelLoaded={isModelLoaded}
        //   onFinish={handleGameStart}
        // />
        <StartScene onFinish={handleGameStart} selectedTheme={selectedTheme} />
      ) : null}
      {isModelLoaded ? (
        <div>
          {/* <StartingCountDown
            isModelLoaded={isModelLoaded}
            onFinish={handleGameStart}
          /> */}
          {selectedThemeType === "multi" ? (
            <>
              <Chat />
              <ProgressBar
                id1={"오희주"}
                id2={"김병주"}
                value1={30}
                value2={40}
              />
            </>
          ) : null}
          <ExitGame>
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/exitbutton.png"}
              alt="exit game image"
              width="40"
              height="40"
            />
          </ExitGame>
        </div>
      ) : (
        <S.LoadingText>로딩 중...</S.LoadingText>
      )}
    </S.Container>
  )
}

export default Page
