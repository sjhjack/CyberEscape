import { useEffect, useRef, useState } from "react"
import RoomModel from "@/components/ingame/elements/space/Backgrounds/RoomModel"
import Player from "../../elements/common/Player"
import BasicScene from "../../BasicScene"
import MeshObjects from "../../elements/space/Basics/MeshObjects"
import Lights from "../../elements/space/Basics/Lights"
import Floor from "../../elements/common/Floor"
import Stars from "../../elements/space/Backgrounds/Stars"
// import Asteroids from "../../elements/space/Backgrounds/Asteroids"
import Venus from "../../elements/space/Backgrounds/Venus"
import KeyModels from "../../elements/space/Basics/KeyModels"
import Sequences from "@/data/ingame/space/Sequences"
import Interactions from "../../elements/space/Basics/Interactions"
import Start from "../../elements/space/Interactions/Start"
import Videos from "../../elements/space/Basics/Videos"
import Subtitle from "../../elements/common/Subtitle"
import Problems from "../../elements/space/Basics/Problems"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import Keys from "../../elements/space/Basics/Keys"
import Result from "../../elements/common/Result"
import useIngameThemeStore from "@/stores/IngameTheme"
import Asteroids from "../../elements/space/Backgrounds/Asteroids"
import LEDLight from "../../elements/space/Basics/LEDLight"
import Triggers from "@/data/ingame/space/Triggers"
// import LEDLight from "../../elements/space/Basics/LEDLight"

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [sequences, setSequences] = useState(Sequences)
  const [subtitle, setSubtitle] = useState(null)
  const [interactNum, setInteractNum] = useState(1)
  const [onAir, setOnAir] = useState(false)
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [result, setResult] = useState<string>("")
  const [clearTime, setClearTime] = useState<string>("")
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false)
  const [trigger, setTrigger] = useState(Triggers)
  const [mouseSpeed, setMouseSpeed] = useState(0.5)

  const { selectedThemeType } = useIngameThemeStore()
  const handleTimeOut = () => {
    setIsTimeOut(true)
    setResult("timeOut")
    setIsGameFinished(true)
  }
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  useEffect(() => {
    if (trigger[1].activate === true) {
      setMouseSpeed(0.2)
    }
  }, [trigger])

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
          <Start onAir={onAir} setOnAir={setOnAir} setSubtitle={setSubtitle} />
        </>
      ) : null}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={7}
          selectedThemeType={selectedThemeType}
          clearTime={clearTime}
        />
      ) : null}
      <Subtitle text={subtitle} />

      <BasicScene
        onAir={onAir}
        interactNum={interactNum}
        mouseSpeed={mouseSpeed}
      >
        <Lights />
        <Player
          position={[3, 1.5, 0]}
          trigger={trigger}
          sequences={sequences}
        />
        <MeshObjects />
        <Floor
          position={[0, 1, 0]}
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
        />
        <Stars trigger={trigger} />
        {/* <Venus /> */}
        <Keys
          sequences={sequences}
          setSequences={setSequences}
          setSubtitle={setSubtitle}
          setInteractNum={setInteractNum}
        />
        <Interactions
          onAir={onAir}
          setOnAir={setOnAir}
          sequences={sequences}
          setSequences={setSequences}
          setSubtitle={setSubtitle}
          setInteractNum={setInteractNum}
          setIsGameFinished={setIsGameFinished}
          setResult={setResult}
          setClearTime={setClearTime}
          timerRef={timerRef}
          trigger={trigger}
          setTrigger={setTrigger}
          timePenalty={timePenalty}
        />
        <Problems
          onAir={onAir}
          setOnAir={setOnAir}
          sequences={sequences}
          setSequences={setSequences}
          setSubtitle={setSubtitle}
          setInteractNum={setInteractNum}
          timePenalty={timePenalty}
        />
        {/* <Asteroids /> */}
        <Videos sequences={sequences} setSequences={setSequences} />
        <RoomModel onLoaded={setIsModelLoaded} />
        {/* <LEDLight /> */}
      </BasicScene>
    </>
  )
}

export default SpaceTheme
