import { useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react"

// 마지막 탈출하기 전 찾을 망치 랜덤 4곳 (시간 남으면 더 추가할 예정)
const Hammer = ({ onClick, solved, setInteractNum }: ClickObjectProps) => {
  const hammer = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/hammer.glb",
    true,
  )
  const objectArr: [number, number, number][][] = [
    [
      [25, 12, -58],
      [0, 0, 9],
    ],
    [
      [-85, 12, -57],
      [0, 0, 9.8],
    ],
    [
      [0.2, 12, 50],
      [0, 0, 9.8],
    ],
    [
      [95.5, 12, 35],
      [0, 0, 9],
    ],
  ]

  const { randomIndex } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * objectArr.length)
    return { randomIndex }
  }, [])

  useEffect(() => {
    if (hammer.scene) {
      hammer.scene.position.set(
        objectArr[randomIndex][0][0],
        objectArr[randomIndex][0][1],
        objectArr[randomIndex][0][2],
      )
      hammer.scene.rotation.set(
        objectArr[randomIndex][1][0],
        objectArr[randomIndex][1][1],
        objectArr[randomIndex][1][2],
      )
    }
  }, [hammer, solved])

  const handlePointerOver = () => {
    if (solved === 3) {
      setInteractNum(2)
    }
  }

  return (
    <primitive
      object={hammer.scene}
      scale={2}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Hammer
