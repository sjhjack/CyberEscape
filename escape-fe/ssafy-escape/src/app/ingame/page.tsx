"use client"

import { useEffect, useState } from "react"
import MainModal from "@/components/common/MainModal"
import CountdownTimer from "@/components/ingame/CountdownTimer"
import Chat from "@/components/ingame/Chat"
import ExitGame from "@/components/ingame/ExitGame"
import ProgressBar from "@/components/ingame/ProgressBar"
import Image from "next/image"
import * as S from "./ingameStyle"
import SpaceTheme from "../../components/ingame/main/space/SpaceTheme"
import StartingCountDown from "@/components/ingame/StartingCountDown"
import HorrorTheme from "@/components/ingame/main/horror/HorrorTheme"
import useIngameThemeStore from "@/stores/IngameTheme"

const Page = () => {
  const [showModal, setShowModal] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const { selectedTheme } = useIngameThemeStore()

  const handleModalClose = () => {
    setShowModal(false)
  }

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
      {selectedTheme === "space" ? (
        <SpaceTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : selectedTheme === "horror" ? (
        <HorrorTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      ) : null}

      {isModelLoaded ? (
        <div>
          <StartingCountDown
            isModelLoaded={isModelLoaded}
            onFinish={handleGameStart}
          />
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
      {showModal && (
        <MainModal
          children={1}
          text={"hi"}
          isOpen={showModal}
          onClose={handleModalClose}
        />
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
