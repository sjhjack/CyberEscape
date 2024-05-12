import { Canvas } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"

import Lights from "@/components/ingame/elements/ssafy/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import SsafyClassRoom from "../../elements/ssafy/SsafyClassRoom"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Start from "../../elements/ssafy/Start"
import Subtitle from "../../elements/common/Subtitle"
// const startPosition = { x: 8, y: 8, z: 1 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }
const SsafyTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [subtitle, setSubtitle] = useState<string>("")
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [interactNum, setInteractNum] = useState<number>(1)
  return (
    <>
      {isGameStart ? (
        <>
          <CountdownTimer ref={timerRef} />
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      <BasicScene interactNum={interactNum}>
        <Lights />
        <Player position={[-5, 7, 12]} speed={20} args={[10, 0, 0]} />
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
