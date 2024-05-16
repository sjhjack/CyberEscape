import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"

// 두 번째 문제가 숨겨진 곳(랜덤)
const SecondProblemObject = ({ onClick, setInteractNum }: ClickObjectProps) => {
  const objectArr: [number, number, number][][] = [
    [
      [-12, 8, 41.5],
      [-20, 8, 43.5],
      [1, 3, 10],
    ],
    [
      [-16.5, 8, 34],
      [10, 3, 1],
    ],
    [
      [21, 8, 62],
      [14, 7.8, 63],
      [1, 3, 11.5],
    ],
  ]

  const [indices, setIndices] = useState({ first: 0, second: 0 })

  useEffect(() => {
    const firstRandomIndex = Math.floor(Math.random() * objectArr.length)
    const secondRandomIndex = Math.floor(
      Math.random() * (objectArr[firstRandomIndex].length - 1),
    )
    setIndices({ first: firstRandomIndex, second: secondRandomIndex })
  }, [])

  return (
    <Box
      position={objectArr[indices.first][indices.second]}
      rotation={[0, 0, 0]}
      args={objectArr[indices.first][objectArr[indices.first].length - 1]}
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

export default SecondProblemObject
