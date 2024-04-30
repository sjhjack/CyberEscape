import { usePlane } from "@react-three/cannon"
import { Mesh } from "three"

const Plane = ({ props }: any) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref as React.MutableRefObject<Mesh>} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="green" transparent opacity={0} />
    </mesh>
  )
}

export default Plane
