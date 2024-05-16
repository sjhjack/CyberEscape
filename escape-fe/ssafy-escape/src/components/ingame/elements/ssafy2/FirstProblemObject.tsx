import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"

// 첫 번째 문제가 숨겨진 곳(랜덤)
const FirstProblemObject = ({ onClick, setInteractNum }: ClickObjectProps) => {
  const objectArr: [number, number, number][][] = [
    [
      [1, 8.3, -23],
      [6, 8.3, -23],
      [14, 8.3, -23],
      [19.5, 8.3, -23],
      [5, 3, 1],
    ],
    [
      [20, 8, 9],
      [16, 8, 9],
      [4, 2, 1],
    ],
    [
      [6, 8, 14],
      [18, 8, 14],
      [12, 6, 1],
    ],
    [
      [-2, 8, 11.5],
      [1, 4, 10.5],
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

export default FirstProblemObject
