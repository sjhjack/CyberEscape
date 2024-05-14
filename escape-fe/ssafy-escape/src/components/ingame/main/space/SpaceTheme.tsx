import { useRef, useState } from "react"
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
import CountdownTimer from "../../CountdownTimer"
import Keys from "../../elements/space/Basics/Keys"
// import LEDLight from "../../elements/space/Basics/LEDLight"

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [sequences, setSequences] = useState(Sequences)
  const [subtitle, setSubtitle] = useState(null)
  const [interactNum, setInteractNum] = useState(1)
  const [onAir, setOnAir] = useState(false)

  return (
    <>
      {isGameStart ? (
        <>
          <CountdownTimer />
          <Start onAir={onAir} setOnAir={setOnAir} setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      <BasicScene onAir={onAir} interactNum={interactNum}>
        <Lights />
        <Player position={[-33, 1, -60]} />
        <MeshObjects />
        <Floor
          position={[0, 1, 0]}
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
        />
        <Stars />
        <Venus />
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
        />
        <Problems
          sequences={sequences}
          setSequences={setSequences}
          setSubtitle={setSubtitle}
          setInteractNum={setInteractNum}
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
