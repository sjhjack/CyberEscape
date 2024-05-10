import { useMemo } from "react"
import { Box } from "@react-three/drei"

// 세 번째 문제가 숨겨진 곳(랜덤)
// 책장의 책이 놓여있는 14곳(시간 남으면 더 추가할 예정)
const ThirdProblemObject = ({
  onClick,
  setInteractNum,
  solved,
}: ClickObjectProps) => {
  const objectArr: [number, number, number][][] = [
    [
      [53, 23, -58],
      [6, 6, 5],
    ],
    [
      [62, 23, -58],
      [6, 6, 5],
    ],
    [
      [71, 23, -58],
      [6, 6, 5],
    ],
    [
      [76, 23, -58],
      [6, 6, 5],
    ],
    [
      [85, 22, -58],
      [7, 2, 5],
    ],
    [
      [85, 32, -58],
      [6, 3, 5],
    ],
    [
      [78, 33, -57.7],
      [6, 6, 5],
    ],
    [
      [69, 33, -57.7],
      [6, 6, 5],
    ],
    [
      [60, 33, -57.7],
      [6, 6, 5],
    ],
    [
      [40, 33, -57.7],
      [6, 6, 5],
    ],
    [
      [48, 44.5, -57.7],
      [6, 6, 5],
    ],
    [
      [71.5, 44.5, -57.7],
      [10, 6, 5],
    ],
    [
      [70, 56, -57.7],
      [6, 6, 5],
    ],
    [
      [50, 56, -57.7],
      [5, 6, 5],
    ],
  ]

  const { randomIndex } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * objectArr.length)
    return { randomIndex }
  }, [])

  return solved === 2 ? (
    <Box
      position={objectArr[randomIndex][0]}
      args={objectArr[randomIndex][1]}
      onClick={() => onClick()}
      onPointerOver={() => setInteractNum(2)}
      onPointerOut={() => setInteractNum(1)}
    >
      <meshStandardMaterial
        attach="material"
        color="orange"
        transparent={true}
        opacity={0}
      />
    </Box>
  ) : null
}

export default ThirdProblemObject
