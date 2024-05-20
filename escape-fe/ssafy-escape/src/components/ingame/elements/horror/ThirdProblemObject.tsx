import { useEffect, useMemo, useState } from "react"
import { Box } from "@react-three/drei"

// 세 번째 문제가 숨겨진 곳(랜덤)
// 책장의 책이 놓여있는 8곳(시간 남으면 더 추가할 예정)
const ThirdProblemObject = ({
  onClick,
  solved,
  setInteractNum,
}: ClickObjectProps) => {
  const objectArr: [number, number, number][][] = [
    [
      [73, 25, 22],
      [5, 7, 2],
    ],
    [
      [72, 35, 17.5],
      [5, 7, 12],
    ],
    [
      [72, 48.5, -3.6],
      [5, 7, 8.5],
    ],
    [
      [71, 60.5, 29.8],
      [5, 3.7, 8.5],
    ],
    [
      [73, 34.5, 26.5],
      [5, 7.5, 4],
    ],
    [
      [73, 34.5, 50],
      [5, 7.5, 4],
    ],
    [
      [73, 34.5, 54],
      [5, 7.5, 4],
    ],
    [
      [73, 34.5, 57.5],
      [5, 7.5, 4],
    ],
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * objectArr.length)
    setIndex(randomIndex)
  }, [])

  return solved === 2 ? (
    <>
      <Box
        position={objectArr[index][0]}
        args={objectArr[index][1]}
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
    </>
  ) : null
}

export default ThirdProblemObject
