import React from "react"
import { useBox } from "@react-three/cannon"
import { Mesh } from "three"

const CockpitDoorBox = ({ sequences, position, args, color }: any) => {
  const [ref, api] = useBox(() => ({
    type: "Static",
    args,
    position,
  }))

  const openDoor = () => {
    if (sequences[0].done === true) {
      const newPosition = [position[0], position[1] + 20, position[2]]
      api.position.set(newPosition[0], newPosition[1], newPosition[2])

      setTimeout(() => {
        api.position.set(position[0], position[1], position[2])
      }, 7000)
    }
  }

  return (
    <mesh
      ref={ref as React.MutableRefObject<Mesh>}
      onClick={openDoor}
      position={position}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} visible={false} />
    </mesh>
  )
}

export default CockpitDoorBox
