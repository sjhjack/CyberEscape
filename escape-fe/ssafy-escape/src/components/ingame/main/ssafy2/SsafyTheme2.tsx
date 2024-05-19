import { useEffect, useRef, useState } from "react"
import Lights from "@/components/ingame/elements/ssafy2/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import SsafyOffice from "../../elements/ssafy2/SsafyOffice"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Start from "../../elements/ssafy2/Start"
import MeshObjects from "../../elements/ssafy2/MeshObjects"
import Diary from "../../elements/ssafy2/Diary"
import useIngameThemeStore from "@/stores/IngameTheme"
import { QueryClient } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import Result from "../../elements/common/Result"
import FirstProblemModal from "../../elements/ssafy2/FirstProblemModal"
import SecondProblemModal from "../../elements/ssafy2/SecondProblemModal"
import ThirdProblemModal from "../../elements/ssafy2/ThirdProblemModal"
import Subtitle from "../../elements/common/Subtitle"
import FirstProblemObject from "../../elements/ssafy2/FirstProblemObject"
import SecondProblemObject from "../../elements/ssafy2/SecondProblemObject"
import FinalDoorObject from "../../elements/ssafy2/FinalDoorObject"
import useUserStore from "@/stores/UserStore"
const SsafyTheme2 = ({
  isGameStart,
  setIsModelLoaded,
  progressUpdate,
  progressReset,
  roomData,
}: IngameMainProps) => {
  const [subtitle, setSubtitle] = useState<string>("")
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [interactNum, setInteractNum] = useState<number>(1)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const { selectedThemeType } = useIngameThemeStore()
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)
  const [isSolvedFirstProblem, setIsSolvedFirstProblem] =
    useState<boolean>(false)
  const [isSolvedSecondProblem, setIsSolvedSecondProblem] =
    useState<boolean>(false)
  const [isSolvedThirdProblem, setIsSolvedThirdProblem] =
    useState<boolean>(false)
  const [mouseSpeed, setMouseSpeed] = useState(0.5)
  const { isHost } = useUserStore()
  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  // 퀴즈 데이터 prefetch
  const queryClient = new QueryClient()
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["quizList", 6],
      queryFn: () => getQuiz(6),
    })
  }, [])

  // 대사 수정 부탁드립니다
  useEffect(() => {
    if (isSolvedFirstProblem && isSolvedSecondProblem && isSolvedThirdProblem) {
      setSubtitle("이 금쪽이 녀석들 도망가게 놔둘 순 없지.")
      setTimeout(() => {
        setSubtitle("꼼짝 마! 어디 못 도망가!")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    }
  }, [isSolvedFirstProblem, isSolvedSecondProblem, isSolvedThirdProblem])

  // 마지막 문 클릭 시
  const handleFinal = () => {
    setResult("victory")
    setIsGameFinished(true)
    if (progressUpdate) {
      progressUpdate()
    }
  }
  useEffect(() => {
    // 둘 중 한 명이 경기를 끝내면
    if (roomData?.guestProgress === 4 || roomData?.hostProgress === 4) {
      // 호스트
      if (isHost) {
        if (roomData?.hostProgress === 4) {
          setResult("victory")
        } else if (roomData?.guestProgress === 4) {
          setResult("defeat")
        }
      }
      // 게스트
      else {
        if (roomData?.guestProgress === 4) {
          setResult("victory")
        } else if (roomData?.hostProgress === 4) {
          setResult("defeat")
        }
      }
      setIsGameFinished(true)
      if (progressReset) {
        progressReset()
      }

      // 게임 종료 후, 5초 뒤 게임 종료 처리 해제
      setTimeout(() => {
        setIsGameFinished(false)
      }, 5000)
    }
  }, [roomData])
  // 시간이 다 됐을 경우
  const handleTimeOut = () => {
    setResult("timeOut")
    setIsGameFinished(true)
  }

  // 첫 번째 문제 모달
  const handleFirstProblem = () => {
    setShowFirstProblem(!showFirstProblem)
  }

  // 두 번째 문제 모달
  const handleSecondProblem = () => {
    setShowSecondProblem(!showSecondProblem)
  }

  // 세 번째 문제 모달
  const handleThirdProblem = () => {
    setShowThirdProblem(!showThirdProblem)
  }

  return (
    <>
      {isGameStart ? (
        <>
          {!isGameFinished && (
            <CountdownTimer
              color={"white"}
              ref={timerRef}
              onTimeOut={handleTimeOut}
              minutes={5}
            />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      {showFirstProblem && !isSolvedFirstProblem ? (
        <FirstProblemModal
          progressUpdate={progressUpdate}
          onClose={handleFirstProblem}
          timePenalty={timePenalty}
          setIsSolvedProblem={setIsSolvedFirstProblem}
        />
      ) : null}
      {showSecondProblem && !isSolvedSecondProblem ? (
        <SecondProblemModal
          progressUpdate={progressUpdate}
          onClose={handleSecondProblem}
          timePenalty={timePenalty}
          setIsSolvedProblem={setIsSolvedSecondProblem}
        />
      ) : null}
      {showThirdProblem && !isSolvedThirdProblem ? (
        <ThirdProblemModal
          progressUpdate={progressUpdate}
          onClose={handleThirdProblem}
          timePenalty={timePenalty}
          setIsSolvedProblem={setIsSolvedThirdProblem}
        />
      ) : null}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={6}
          selectedThemeType={selectedThemeType}
        />
      ) : null}
      <BasicScene
        interactNum={interactNum}
        onAir={true}
        mouseSpeed={mouseSpeed}
      >
        <MeshObjects />
        <Lights />
        <Diary
          onClick={handleThirdProblem}
          setInteractNum={setInteractNum}
          isSolvedProblem={isSolvedThirdProblem}
        />
        {!isSolvedFirstProblem ? (
          <FirstProblemObject
            onClick={handleFirstProblem}
            setInteractNum={setInteractNum}
          />
        ) : null}
        {!isSolvedSecondProblem ? (
          <SecondProblemObject
            onClick={handleSecondProblem}
            setInteractNum={setInteractNum}
          />
        ) : null}
        {isSolvedFirstProblem &&
        isSolvedSecondProblem &&
        isSolvedThirdProblem ? (
          <FinalDoorObject
            onClick={handleFinal}
            setInteractNum={setInteractNum}
          />
        ) : null}
        <Player position={[0, 7, 0]} speed={30} args={[0, 0, 0]} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <SsafyOffice onLoaded={setIsModelLoaded} />
      </BasicScene>
    </>
  )
}

export default SsafyTheme2
