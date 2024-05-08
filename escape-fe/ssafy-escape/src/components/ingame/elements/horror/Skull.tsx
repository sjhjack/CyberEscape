import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Skull = ({ onClick }: ClickObjectProps) => {
  const skull = useGLTF("/glb/horror/skull.glb", true)

  useEffect(() => {
    if (skull.scene) {
      skull.scene.position.set(-20, 6, -3)
      skull.scene.rotation.set(0, 0, 80)
    }
  }, [skull])

  return <primitive object={skull.scene} scale={40} onClick={onClick} />
}

export default Skull
