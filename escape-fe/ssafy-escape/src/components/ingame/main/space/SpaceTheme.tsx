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
import Interactions from "../../elements/space/Basics/Interactions"

interface KeyData {
  active: boolean
  position: [number, number, number]
}

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [activeKeys, setActiveKeys] = useState<KeyData[]>(Keys)

  const onClick = (index: number) => {
    const updatedKeys = [...activeKeys]
    updatedKeys[index] = { ...updatedKeys[index], active: false }
    setActiveKeys(updatedKeys)
  }

  return (
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
      <Interactions />
      <Asteroids />
      <RoomModel onLoaded={setIsModelLoaded} />
    </BasicScene>
  )
}

export default SpaceTheme
