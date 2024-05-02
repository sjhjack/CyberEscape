import RoomModel from "@/components/ingame/elements/space/RoomModel"
import Player from "../../elements/common/Player"
import BasicScene from "../../BasicScene"
import MeshObjects from "../../elements/space/MeshObjects"
import Lights from "../../elements/space/Lights"
import Floor from "../../elements/common/Floor"

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  return (
    <BasicScene>
      <Lights />
      <Player position={[3, 1, 0]} />
      <MeshObjects />
      <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />

      <RoomModel onLoaded={setIsModelLoaded} />
    </BasicScene>
  )
}

export default SpaceTheme
