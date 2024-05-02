import RoomModel from "@/components/ingame/elements/space/RoomModel"
import Player from "../../elements/common/Player"
import BaseBox from "../../elements/common/BaseBox"
import BasicScene from "../../BasicScene"

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  return (
    <BasicScene>
      <Player position={[3, 1, 0]} />
      <RoomModel onLoaded={setIsModelLoaded} />
    </BasicScene>
  )
}

export default SpaceTheme
