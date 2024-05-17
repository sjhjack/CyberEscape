import { useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react"

// 마지막 탈출하기 전 찾을 주사기 랜덤 3곳 (시간 남으면 더 추가할 예정)
const Syringe = ({ onClick, solved, setInteractNum }: ClickObjectProps) => {
  const syringe = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/syringe.glb",
    true,
  )
  const objectArr: [number, number, number][][] = [
    [
      [89, 31.8, 8],
      [0, 0.5, 0],
    ],
    [
      [87, 31.8, -10],
      [0, 2.3, 0],
    ],
    [
      [55, 31.8, 53],
      [0, 1.3, 0],
    ],
  ]

  const { randomIndex } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * objectArr.length)
    return { randomIndex }
  }, [])

  useEffect(() => {
    if (syringe.scene) {
      syringe.scene.position.set(
        objectArr[randomIndex][0][0],
        objectArr[randomIndex][0][1],
        objectArr[randomIndex][0][2],
      )
      syringe.scene.rotation.set(
        objectArr[randomIndex][1][0],
        objectArr[randomIndex][1][1],
        objectArr[randomIndex][1][2],
      )
    }
  }, [syringe, solved])

  const handlePointerOver = () => {
    if (solved === 3) {
      setInteractNum(2)
    }
  }

  return (
    <primitive
      object={syringe.scene}
      scale={40}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Syringe
