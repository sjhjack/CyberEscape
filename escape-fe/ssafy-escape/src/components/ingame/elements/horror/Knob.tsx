import { useGLTF } from "@react-three/drei"
import { useEffect, useMemo, useState } from "react"

// 마지막 탈출 키인 문고리 오브젝트(랜덤, 시간 남으면 추가 예정)
const Knob = ({
  onClick,
  isFind,
  solved,
  setInteractNum,
}: ClickObjectProps) => {
  const knob = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/knob.glb",
    true,
  )
  const knobPosition: [number, number, number][] = [
    [-49, -32, 10],
    [-60, -32, 27],
    [-45, -32, 118],
    [98, -32, 139],
    [99, -32, 60],
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * knobPosition.length)
    setIndex(randomIndex)
  }, [])

  useEffect(() => {
    if (knob.scene) {
      if (isFind) {
        knob.scene.position.set(0, 0, 0)
      } else {
        knob.scene.position.set(
          knobPosition[index][0],
          knobPosition[index][1],
          knobPosition[index][2],
        )
      }
    }
  }, [knob, isFind, solved])

  return solved === 3 ? (
    <primitive
      object={knob.scene}
      scale={35}
      onPointerOver={() => setInteractNum(2)}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  ) : null
}

export default Knob
