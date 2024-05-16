import { Canvas } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"

import Lights from "@/components/ingame/elements/ssafy2/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import SsafyOffice from "../../elements/ssafy2/SsafyOffice"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Start from "../../elements/ssafy2/Start"
import Subtitle from "../../elements/common/Subtitle"
import MeshObjects from "../../elements/ssafy2/MeshObjects"
import Plant from "../../elements/ssafy2/Plant"
import Diary from "../../elements/ssafy2/Diary"
import Tumbler from "../../elements/ssafy2/Tumbler"
import useIngameSolvedStore from "@/stores/IngameQuizStore"
// const startPosition = { x: 8, y: 8, z: 1 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }
const SsafyTheme2 = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [subtitle, setSubtitle] = useState<string>("")
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [interactNum, setInteractNum] = useState<number>(1)
  const [penalty, setPenalty] = useState<number>(0)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const { solved } = useIngameSolvedStore()
  const handleTimeOut = () => {
    setIsTimeOut(true)
    setResult("Timeout")
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
            <CountdownTimer ref={timerRef} onTimeOut={handleTimeOut} />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <BasicScene interactNum={interactNum} onAir={true}>
        {/* <MeshObjects /> */}
        <Lights />
        <Diary
          onClick={handleFirstProblem}
          solved={solved}
          setInteractNum={setInteractNum}
        />
        <Player position={[0, 11, 0]} speed={40} args={[0, 0, 0]} />
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
