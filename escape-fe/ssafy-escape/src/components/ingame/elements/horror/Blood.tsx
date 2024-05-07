import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

interface BloodProps {
  position: [number, number, number]
}

const Blood = ({ position }: BloodProps) => {
  const blood = useGLTF("/glb/horror/blood.glb", true)
  useEffect(() => {
    if (blood.scene) {
      blood.scene.position.set(position[0], position[1], position[2])
      blood.scene.renderOrder = 10
    }
  }, [blood])

  return <primitive object={blood.scene} scale={35} />
}

export default Blood
