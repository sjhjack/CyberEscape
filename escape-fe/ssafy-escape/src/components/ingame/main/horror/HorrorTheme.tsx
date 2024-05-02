import DollModel from "@/components/ingame/elements/horror/DollModel"
import HorrorRoomModel from "@/components/ingame/elements/horror/HorrorRoomModel"
import Lights from "../../elements/horror/Lights"
import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror/MeshObjects"
import Floor from "../../elements/common/Floor"
import Blood from "../../elements/horror/Blood"
import { useState } from "react"
import Skull from "../../elements/horror/Skull"
import Flower from "../../elements/horror/Flower"
// const startPosition = { x: 8, y: 8, z: -2 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [isFlowerShow, setIsFlowerShow] = useState<boolean>(true)
  const handleDoll = () => {
    console.log("인형클릭")
  }

  const handleFlowerClick = () => {
    console.log("꽃클릭")
    setIsFlowerShow(false)
  }
  return (
    <BasicScene>
      <Lights />
      <Player position={[3, 50, 0]} speed={100} args={[2, 100, 5]} />
      <Floor
        rotation={[Math.PI / -2, 0, 0]}
        color="white"
        position={[0, -0.5, 0]}
      />
      {isFlowerShow ? <Flower onClick={handleFlowerClick} /> : null}
      <MeshObjects />
      <Blood />
      <Skull />
      <DollModel onClick={handleDoll} />
      <HorrorRoomModel onLoaded={setIsModelLoaded} />
    </BasicScene>
  )
}

export default HorrorTheme
