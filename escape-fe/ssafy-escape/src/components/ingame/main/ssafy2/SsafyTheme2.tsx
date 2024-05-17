import { useEffect, useRef, useState } from "react"
import Lights from "@/components/ingame/elements/ssafy2/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import SsafyOffice from "../../elements/ssafy2/SsafyOffice"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Start from "../../elements/ssafy2/Start"
// import MeshObjects from "../../elements/ssafy2/MeshObjects"
import Diary from "../../elements/ssafy2/Diary"
import useIngameQuizStore from "@/stores/IngameQuizStore"
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

const SsafyTheme2 = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [subtitle, setSubtitle] = useState<string>("")
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [interactNum, setInteractNum] = useState<number>(1)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const { solved } = useIngameQuizStore()
  const { selectedThemeType } = useIngameThemeStore()
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)

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

  // 마지막 문 클릭 시
  const handleFinal = () => {
    setResult("victory")
    setIsGameFinished(true)
  }

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
              color={"#000000"}
              ref={timerRef}
              onTimeOut={handleTimeOut}
            />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      {showFirstProblem ? (
        <FirstProblemModal
          onClose={handleFirstProblem}
          timePenalty={timePenalty}
        />
      ) : null}
      {showSecondProblem ? (
        <SecondProblemModal
          onClose={handleSecondProblem}
          timePenalty={timePenalty}
        />
      ) : null}
      {showThirdProblem ? (
        <ThirdProblemModal
          onClose={handleThirdProblem}
          timePenalty={timePenalty}
        />
      ) : null}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={6}
          selectedThemeType={selectedThemeType}
        />
      ) : null}
      <BasicScene interactNum={interactNum} onAir={true}>
        {/* <MeshObjects /> */}
        <Lights />
        <Diary onClick={handleThirdProblem} setInteractNum={setInteractNum} />
        <FirstProblemObject
          onClick={handleFirstProblem}
          setInteractNum={setInteractNum}
        />
        <SecondProblemObject
          onClick={handleSecondProblem}
          setInteractNum={setInteractNum}
        />
        <FinalDoorObject
          onClick={handleFinal}
          setInteractNum={setInteractNum}
          solved={solved}
        />
        <Player position={[0, 7, 0]} speed={40} args={[0, 0, 0]} />
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
