import HangedDoll from "@/components/ingame/elements/horror/HangedDoll"
import HorrorRoom from "@/components/ingame/elements/horror/HorrorRoom"
import Lights from "../../elements/horror/Lights"
import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror/MeshObjects"
import Floor from "../../elements/common/Floor"
import Blood from "../../elements/horror/Blood"
import { useEffect, useState } from "react"
import Skull from "../../elements/horror/Skull"
import Flower from "../../elements/horror/Flower"
import Wall from "../../elements/horror/Wall"
import Portrait from "../../elements/horror/Portrait"
import Art from "../../elements/horror/Art"
import BloodPool from "../../elements/horror/BloodPool"

// const startPosition = { x: 8, y: 8, z: -2 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [isFlowerClicked, setIsFlowerClicked] = useState<boolean>(false)
  const [twoMinLater, setTwoMinLater] = useState<boolean>(false)
  const [fiveMinLater, setFiveMinLater] = useState<boolean>(false)
  const [isFanalty, setIsFanalty] = useState<boolean>(false)
  const [solved, setSolved] = useState<number>(0)

  useEffect(() => {
    // 2분 경과 시
    const twoMintimer = setTimeout(() => {
      setIsFanalty(true)
      setTwoMinLater(true)
    }, 60000 * 2)

    // 5분 경과 시
    const fiveMintimer = setTimeout(() => {
      setFiveMinLater(true)
    }, 60000 * 5)

    return () => {
      clearTimeout(twoMintimer), clearTimeout(fiveMintimer)
    }
  }, [])

  const handleFlowerClick = () => {
    setIsFlowerClicked(true)
  }
  console.log(solved)
  const handleSkullClick = () => {
    // 첫 번째 문제 모달
    setSolved(solved + 1)
  }

  return (
    <BasicScene>
      <Lights isFanalty={isFanalty} />
      <Player position={[3, 50, 0]} speed={100} args={[2, 100, 5]} />
      <Floor
        rotation={[Math.PI / -2, 0, 0]}
        color="white"
        position={[0, -0.5, 0]}
      />
      <MeshObjects />
      {!isFlowerClicked ? <Flower onClick={handleFlowerClick} /> : null}
      <BloodPool solved={solved} isFlowerClicked={isFlowerClicked} />
      <Skull onClick={handleSkullClick} />
      <Wall />
      <Art twoMinLater={twoMinLater} />
      <Portrait twoMinLater={twoMinLater} fiveMinLater={fiveMinLater} />
      <HangedDoll />
      <HorrorRoom onLoaded={setIsModelLoaded} />
    </BasicScene>
  )
}

export default HorrorTheme
