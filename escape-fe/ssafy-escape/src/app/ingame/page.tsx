"use client"
import { useEffect, useState } from "react"
import MainModal from "@/components/common/MainModal"
import CountdownTimer from "@/components/ingame/CountdownTimer"
import Chat from "@/components/ingame/Chat"
import ExitGame from "@/components/ingame/ExitGame"
import ProgressBar from "@/components/ingame/ProgressBar"
import type { NextPage } from "next"
import Image from "next/image"
import * as S from "./ingameStyle"
import Space from "../../components/ingame/main/space/page"

const Page: NextPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const handleModalClose = () => {
    setShowModal(false)
  }

  const onStartClick = () => {
    const canvas = document.querySelector("canvas")
    if (canvas && !document.pointerLockElement) {
      canvas.requestPointerLock()
    }
  }

  useEffect(() => {
    document.addEventListener("click", onStartClick)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isModelLoaded && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1)
      }, 1000)
    } else if (countdown === 0) {
      setIsGameStart(true)
    }
    return () => clearInterval(intervalId)
  }, [isModelLoaded, countdown])

  return (
    <S.Container>
      <Space setIsModelLoaded={setIsModelLoaded} isGameStart={isGameStart} />
      {isModelLoaded && countdown > 0 ? (
        <S.CountdownBox>{countdown}</S.CountdownBox>
      ) : null}
      {showModal && (
        <MainModal
          children={1}
          text={"hi"}
          isOpen={showModal}
          onClose={handleModalClose}
        />
      )}
      {countdown <= 0 ? <CountdownTimer /> : null}
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
    </S.Container>
  )
}

export default Page
