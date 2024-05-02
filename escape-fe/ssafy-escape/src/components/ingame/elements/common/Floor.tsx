import { usePlane } from "@react-three/cannon"
import { Mesh } from "three"

const Floor = (props: any) => {
  const [ref] = usePlane((index) => ({
    type: "Static",
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
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

export default Floor
