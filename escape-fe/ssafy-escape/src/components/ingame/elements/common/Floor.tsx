import { usePlane } from "@react-three/cannon"
import { Mesh } from "three"

const Floor = (props: any) => {
  const [ref] = usePlane((index) => ({
    type: "Static",
    position: props.position,
    gravity: [0, -9.8, 0],
    rotation: [-Math.PI / 2, 0, 0],
    mass: 0,
    ...props,
  }))

  return (
    <mesh
      receiveShadow
      rotation={props.rotation}
      ref={ref as React.MutableRefObject<Mesh>}
    >
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={props.color} transparent opacity={0} />
    </mesh>
  )
}

export default Floor
