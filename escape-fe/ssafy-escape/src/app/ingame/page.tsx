"use client"
import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import CameraKeyControls from "@/components/ingame/CameraControl"
import PointerLockControls from "@/components/ingame/PointerLockControl"
import MainModal from "@/components/common/MainModal"
import RoomModel from "@/components/ingame/RoomModel"
import KeyModels from "@/components/ingame/KeyModels"
import CountdownTimer from "@/components/ingame/CountdownTimer"
import Chat from "@/components/ingame/Chat"
import ExitGame from "@/components/ingame/ExitGame"
import type { NextPage } from "next"
import Image from "next/image"
import * as S from "./ingameStyle"

interface PointerLockControlsMethods {
  moveToPosition: (x: number, y: number, z: number) => void
}

const Page: NextPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [showObject, setShowObject] = useState(true)
  const pointerLockControlsRef = useRef<PointerLockControlsMethods | null>(null)

  const handleModalClose = () => {
    setShowModal(false)
  }

  // const handleHideObject = () => {
  //   setShowObject(false)
  // }

  const onKeyClick = () => {
    setShowModal(!showModal)
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
      <Canvas
        shadows
        style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight
          position={[1, 1, 5]}
          intensity={1}
          castShadow
          receiveShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {showObject && <KeyModels onClick={onKeyClick} />}
        <RoomModel onLoaded={setIsModelLoaded} />
        <PointerLockControls ref={pointerLockControlsRef} />
        {isGameStart ? <CameraKeyControls /> : null}
      </Canvas>
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
      <ExitGame>
        <Image
          src="/image/exitgame.png"
          alt="exit game image"
          width="40"
          height="40"
        />
      </ExitGame>
    </S.Container>
  )
}

export default Page
