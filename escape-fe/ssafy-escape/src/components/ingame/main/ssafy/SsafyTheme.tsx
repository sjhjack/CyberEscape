import { useEffect, useRef, useState } from "react"
import Lights from "@/components/ingame/elements/ssafy/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import SsafyClassRoom from "../../elements/ssafy/SsafyClassRoom"
import MeshObjects from "../../elements/ssafy/MeshObjects"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Start from "../../elements/ssafy/Start"
import Notebook from "../../elements/ssafy/NoteBook"
import Subtitle from "../../elements/common/Subtitle"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import Result from "../../elements/common/Result"
import useIngameThemeStore from "@/stores/IngameTheme"

// const startPosition = { x: 8, y: 8, z: 1 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }
const SsafyTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [subtitle, setSubtitle] = useState<string>("")
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [interactNum, setInteractNum] = useState<number>(1)
  const [penalty, setPenalty] = useState<number>(0)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false)
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const { solved } = useIngameQuizStore()
  const { selectedThemeType } = useIngameThemeStore()
  const [clearTime, setClearTime] = useState<string>("")

  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  const handleTimeOut = () => {
    setIsTimeOut(true)
    setResult("timeOut")
    setIsGameFinished(true)
  }

  const handleFirstProblem = () => {
    if (solved === 0) {
      setShowFirstProblem(!showFirstProblem)
    }
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
      {/* {showFirstProblem ? (
        <FirstProblemModal
          onClose={handleFirstProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {showSecondProblem ? (
        <SecondProblemModal
          onClose={handleSecondProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {showThirdProblem ? (
        <ThirdProblemModal
          onClose={handleThirdProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null} */}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={1}
          selectedThemeType={selectedThemeType}
          clearTime={clearTime}
        />
      ) : null}
      <BasicScene interactNum={interactNum} onAir={true}>
        <MeshObjects />
        <Lights />
        <Notebook
          onClick={handleFirstProblem}
          solved={solved}
          setInteractNum={setInteractNum}
        />
        <Player position={[-3, 11, 10]} speed={100} args={[0, 0, 0]} />
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

export default SsafyTheme
