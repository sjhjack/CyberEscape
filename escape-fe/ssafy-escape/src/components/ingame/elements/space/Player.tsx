import { useBox } from "@react-three/cannon"
import { Mesh } from "three"

const Player = ({ props }: any) => {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 0, 0], ...props }))
  return (
    <mesh
      ref={ref as React.MutableRefObject<Mesh>}
      {...props}
      scale={[140, 300, 20]}
    >
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  )
}

export default Player
