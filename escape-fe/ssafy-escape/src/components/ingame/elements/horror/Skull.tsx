import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

type SkullProps = {
  onClick: () => void
}

const Skull = ({ onClick }: SkullProps) => {
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
