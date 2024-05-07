import { useBox } from "@react-three/cannon"
import { useGLTF, Sparkles } from "@react-three/drei"

const Computer = ({ ...props }) => {
  const { nodes, materials } = useGLTF("/glb/key.glb")
  const [ref] = useBox((index) => ({
    type: "Static",
    mass: 1,
    args: props.args,
    position: props.position,

    ...props,
  }))

  return (
    <>
      <Sparkles count={200} scale={[20, 20, 10]} size={3} speed={2} />
      <mesh
        scale={props.scale}
        castShadow
        receiveShadow
        // geometry={nodes}
        material={materials.color_main}
      />
    </>
  )
}

export default Computer
