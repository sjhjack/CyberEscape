import { useBox } from "@react-three/cannon"
import { Mesh } from "three"

const BaseBox = ({ ...props }) => {
  const [ref] = useBox((index) => ({
    type: "Static",
    mass: 10,
    onCollide: (e) => {
      console.log(e)
    },
    ...props,
  }))

  return (
    <mesh
      castShadow
      position={props.position}
      ref={ref as React.MutableRefObject<Mesh>}
    >
      <boxGeometry args={props.args} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

export default BaseBox
