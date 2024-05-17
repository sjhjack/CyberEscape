import { useEffect, useState } from "react"
import { Box } from "@react-three/drei"

// 두 번째 문제가 숨겨진 곳(랜덤)
// 서랍장 위치 3곳, 서랍 4가지(시간 남으면 더 추가할 예정)
const SecondProblemObject = ({
  onClick,
  setInteractNum,
  solved,
}: ClickObjectProps) => {
  const objectArr: [number, number, number][][] = [
    [
      [-45, 18, 48],
      [-50, 18, 42],
      [-47, 12, 46],
      [-48, 6, 46],
      [0, 18, 0],
    ],
    [
      [-69, 18, -55],
      [-69, 18, -63],
      [-69, 12, -59],
      [-69, 6, -59],
      [0, 33, 0],
    ],
    [
      [69, 18, -32],
      [69, 18, -24.5],
      [69, 12, -28.5],
      [69, 6.1, -28.5],
      [0, 33, 0],
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

  return solved === 1 ? (
    <>
      <Box
        position={objectArr[indices.first][indices.second]}
        rotation={objectArr[indices.first][4]}
        args={
          indices.second === 2 || indices.second === 3 ? [14, 5, 2] : [6, 4, 2]
        }
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

export default SecondProblemObject
