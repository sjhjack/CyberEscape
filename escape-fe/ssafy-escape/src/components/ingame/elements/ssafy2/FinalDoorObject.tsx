import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"

// 마지막 나갈 수 있는 문(랜덤)
const FinalDoorObject = ({ onClick, setInteractNum }: ClickObjectProps) => {
  const objectArr: [number, number, number][] = [
    [-34, 10, -35],
    [-57, 10, -35],
    [-61, 10, 50],
  ]

  const [index, setIndex] = useState(0)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * objectArr.length)
    setIndex(randomIndex)
  }, [])

  return (
    <Box
      position={objectArr[index]}
      rotation={[0, 0, 0]}
      args={[10, 20, 1]}
      onPointerOver={() => setInteractNum(2)}
      onPointerOut={() => setInteractNum(1)}
      onClick={() => onClick()}
    >
      <meshStandardMaterial
        attach="material"
        color="orange"
        transparent={true}
        opacity={0}
      />
    </Box>
  )
}

export default FinalDoorObject
