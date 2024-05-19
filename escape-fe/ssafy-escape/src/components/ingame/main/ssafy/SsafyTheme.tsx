import { useEffect, useRef, useState } from "react"
import Lights from "@/components/ingame/elements/ssafy2/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Start from "../../elements/ssafy2/Start"
import MeshObjects from "../../elements/ssafy/MeshObjects"
import useIngameThemeStore from "@/stores/IngameTheme"
import { QueryClient } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import Result from "../../elements/common/Result"
import FirstProblemModal from "../../elements/ssafy/FirstProblemModal"
import SecondProblemModal from "../../elements/ssafy/SecondProblemModal"
import ThirdProblemModal from "../../elements/ssafy/ThirdProblemModal"
import Subtitle from "../../elements/common/Subtitle"
import Notebook1 from "../../elements/ssafy/NoteBook1"
import Notebook2 from "../../elements/ssafy/NoteBook2"
import SsafyClassRoom from "../../elements/ssafy/SsafyClassRoom"
import postUpdateRank from "@/services/main/ranking/postUpdateRank"
import useUserStore from "@/stores/UserStore"
import SecondToTime from "@/hooks/SecondToTime"
import Plant from "../../elements/ssafy/Plant"
import ThirdProblemObject from "../../elements/ssafy/ThirdProblemObject"
import FinalDoorObject from "../../elements/ssafy/FinalDoorObject"

const SsafyTheme2 = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
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
  const [clearTime, setClearTime] = useState<string>("")
  const { userUuid, isHost } = useUserStore()
  const [mouseSpeed, setMouseSpeed] = useState(0.5)

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
      queryKey: ["quizList", 5],
      queryFn: () => getQuiz(5),
    })
  }, [])

  // 대사 수정 부탁드립니다
  useEffect(() => {
    if (isSolvedFirstProblem && isSolvedSecondProblem && isSolvedThirdProblem) {
      setSubtitle("이제 방 문으로 나갈 수 있다는 대사")
      setTimeout(() => {
        setSubtitle("이제 방 문으로 나갈 수 있다는 대사2")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    }
  }, [isSolvedFirstProblem, isSolvedSecondProblem, isSolvedThirdProblem])

  // 마지막 문 클릭 시
  const handleFinal = async () => {
    if (selectedThemeType === "single") {
      if (timerRef.current) {
        const currentTime = timerRef.current.getTime()
        const clearSeconds =
          600 - currentTime.minutes * 60 + currentTime.seconds
        setClearTime(SecondToTime(clearSeconds))
        await postUpdateRank(SecondToTime(clearSeconds), userUuid as string, 4)
      }
      setResult("victory")
      setIsGameFinished(true)
    }
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
              color={"white"}
              ref={timerRef}
              onTimeOut={handleTimeOut}
            />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      {showFirstProblem && !isSolvedFirstProblem ? (
        <FirstProblemModal
          onClose={handleFirstProblem}
          timePenalty={timePenalty}
          setIsSolvedProblem={setIsSolvedFirstProblem}
        />
      ) : null}
      {showSecondProblem && !isSolvedSecondProblem ? (
        <SecondProblemModal
          onClose={handleSecondProblem}
          timePenalty={timePenalty}
          setIsSolvedProblem={setIsSolvedSecondProblem}
        />
      ) : null}
      {showThirdProblem && !isSolvedThirdProblem ? (
        <ThirdProblemModal
          onClose={handleThirdProblem}
          timePenalty={timePenalty}
          setIsSolvedProblem={setIsSolvedThirdProblem}
        />
      ) : null}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={4}
          selectedThemeType={selectedThemeType}
          clearTime={clearTime}
        />
      ) : null}
      <BasicScene
        interactNum={interactNum}
        onAir={true}
        mouseSpeed={mouseSpeed}
      >
        <MeshObjects />
        <Lights />
        <Player position={[-3, 11, 10]} speed={40} args={[0, 0, 0]} />
        <Notebook1
          onClick={handleFirstProblem}
          setInteractNum={setInteractNum}
          isSolvedProblem={isSolvedFirstProblem}
        />
        <Notebook2
          onClick={handleSecondProblem}
          setInteractNum={setInteractNum}
          isSolvedProblem={isSolvedSecondProblem}
        />
        {!isSolvedThirdProblem ? (
          <ThirdProblemObject
            onClick={handleThirdProblem}
            setInteractNum={setInteractNum}
            isSolvedProblem={isSolvedThirdProblem}
          />
        ) : null}
        <Plant />
        {isSolvedFirstProblem &&
        isSolvedSecondProblem &&
        isSolvedThirdProblem ? (
          <FinalDoorObject
            onClick={handleFinal}
            setInteractNum={setInteractNum}
          />
        ) : null}
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <SsafyClassRoom onLoaded={setIsModelLoaded} />
      </BasicScene>
    </>
  )
}

export default SsafyTheme2
