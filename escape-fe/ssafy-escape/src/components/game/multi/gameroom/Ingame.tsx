"use client"

import { useEffect, useState } from "react"
import Chat from "@/components/ingame/Chat"
import ExitGame from "@/components/ingame/ExitGame"
import ProgressBar from "@/components/ingame/ProgressBar"
import Image from "next/image"
import * as S from "@/app/ingame/ingameStyle"
// import StartingCountDown from "@/components/ingame/StartingCountDown"
import HorrorTheme from "@/components/ingame/main/horror/HorrorTheme"
import SsafyTheme from "@/components/ingame/main/ssafy/SsafyTheme"
import useIngameThemeStore from "@/stores/IngameTheme"
import StartScene from "@/components/ingame/StartScene"
import HorrorTheme2 from "@/components/ingame/main/horror2/HorrorTheme2"
import SsafyTheme2 from "@/components/ingame/main/ssafy2/SsafyTheme2"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
interface IngameProps {
  roomData: PubResponseData | null
  progressUpdate: () => void
  progressReset: () => void
  sendMessage: (text: string) => void
  chatting: chatData[]
  gameTheme: number
}

const Ingame = ({
  roomData,
  progressUpdate,
  progressReset,
  sendMessage,
  chatting,
  gameTheme,
}: IngameProps) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)
  const { selectedThemeType } = useIngameThemeStore()
  const exitGame = (e: any) => {
    e.preventDefault()
    Swal.fire({
      title: "지금 나가면 몰수패 처리 됩니다. 정말 나가시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/main"
      }
    })
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
      {gameTheme === 1 || gameTheme === 2 ? (
        <HorrorTheme
          progressUpdate={progressUpdate}
          setIsModelLoaded={setIsModelLoaded}
          progressReset={progressReset}
          isGameStart={isGameStart}
          roomData={roomData}
        />
      ) : gameTheme === 4 || gameTheme === 5 ? (
        <SsafyTheme
          progressUpdate={progressUpdate}
          setIsModelLoaded={setIsModelLoaded}
          progressReset={progressReset}
          isGameStart={isGameStart}
          roomData={roomData}
        />
      ) : gameTheme === 3 ? (
        <HorrorTheme2
          progressUpdate={progressUpdate}
          setIsModelLoaded={setIsModelLoaded}
          progressReset={progressReset}
          isGameStart={isGameStart}
          roomData={roomData}
        />
      ) : gameTheme === 6 ? (
        <SsafyTheme2
          progressUpdate={progressUpdate}
          setIsModelLoaded={setIsModelLoaded}
          progressReset={progressReset}
          isGameStart={isGameStart}
          roomData={roomData}
        />
      ) : null}

      {isModelLoaded && !isGameStart ? (
        // <StartingCountDown
        //   isModelLoaded={isModelLoaded}
        //   onFinish={handleGameStart}
        // />
        <StartScene onFinish={handleGameStart} selectedTheme={gameTheme} />
      ) : null}
      {isModelLoaded ? (
        <div>
          {/* <StartingCountDown
            isModelLoaded={isModelLoaded}
            onFinish={handleGameStart}
          /> */}
          {selectedThemeType === "multi" ? (
            <>
              <Chat sendMessage={sendMessage} chatting={chatting} />
              <ProgressBar
                id1={roomData?.host?.nickname}
                id2={roomData?.guest?.nickname}
                value1={
                  roomData?.hostProgress ? roomData?.hostProgress * 25 : 0
                }
                value2={
                  roomData?.guestProgress ? roomData?.guestProgress * 25 : 0
                }
              />
            </>
          ) : null}
          <ExitGame>
            <Image
              onClick={(e) => exitGame(e)}
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

export default Ingame
