import { useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react"

// 마지막 탈출 키인 문고리 오브젝트(랜덤, 시간 남으면 추가 예정)
const Knob = ({ onClick, isFind, solved, setInteractNum }: ClickObjectProps) => {
  const knob = useGLTF("/glb/horror/knob.glb", true)
  const knobPosition: [number, number, number][] = [
    [-60, -30, 20],
    [-41, -30, 120],
    [98, -30, 139],
    [99, -30, 60],
  ]
  const { randomIndex } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * knobPosition.length)
    return { randomIndex }
  }, [])
  useEffect(() => {
    if (knob.scene) {
      if (isFind) {
        knob.scene.position.set(0, 0, 0)
      } else {
        knob.scene.position.set(
          knobPosition[randomIndex][0],
          knobPosition[randomIndex][1],
          knobPosition[randomIndex][2],
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
