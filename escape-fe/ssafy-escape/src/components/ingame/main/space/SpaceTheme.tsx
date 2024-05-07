import { useState } from "react"
import RoomModel from "@/components/ingame/elements/space/Backgrounds/RoomModel"
import Player from "../../elements/common/Player"
import BasicScene from "../../BasicScene"
import MeshObjects from "../../elements/space/Basics/MeshObjects"
import Lights from "../../elements/space/Basics/Lights"
import Floor from "../../elements/common/Floor"
import Stars from "../../elements/space/Backgrounds/Stars"
import Asteroids from "../../elements/space/Backgrounds/Asteroids"
import Venus from "../../elements/space/Backgrounds/Venus"
import KeyModels from "../../elements/space/Basics/KeyModels"
import Keys from "@/data/ingame/space/Keys"
import Sequences from "@/data/ingame/space/Sequences"
import Interactions from "../../elements/space/Basics/Interactions"
import Start from "../../elements/space/Interactions/Start"
import Videos from "../../elements/space/Basics/Videos"
import Subtitle from "../../elements/common/Subtitle"

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [sequences, setSequences] = useState(Sequences)
  const [activeKeys, setActiveKeys] = useState(Keys)
  const [subtitle, setSubtitle] = useState(null)

  const onClick = (index: number) => {
    const updatedKeys = [...activeKeys]
    updatedKeys[index] = { ...updatedKeys[index], active: false }
    setActiveKeys(updatedKeys)
    if (index === 0) {
      const updatedSequence = [...sequences]
      updatedSequence[0] = { ...updatedSequence[0], done: true }
      setSequences(updatedSequence)
    }
  }

  return (
    <>
      {isGameStart ? <Start setSubtitle={setSubtitle} /> : null}
      <Subtitle text={subtitle} />
      <BasicScene>
        <Lights />
        <Player position={[3, 1, 0]} />
        <MeshObjects />
        <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
        <Stars />
        <Venus />
        {activeKeys.map(({ active, position }, index) => (
          <KeyModels
            key={index}
            active={active}
            position={position}
            onClick={() => onClick(index)}
          />
        ))}
        <Interactions
          sequences={sequences}
          setSequences={setSequences}
          setSubtitle={setSubtitle}
        />
        <Asteroids />
        <Videos sequences={sequences} setSequences={setSequences} />
        <RoomModel onLoaded={setIsModelLoaded} />
      </BasicScene>
    </>
  )
}

export default SpaceTheme
