import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

interface BloodProps {
  fanalty: number
}

const Blood = ({ fanalty }: BloodProps) => {
  const blood = useGLTF("/glb/horror/blood.glb", true)
  useEffect(() => {
    if (blood.scene) {
      blood.scene.position.set(50, 43.3, -86)
      blood.scene.renderOrder = 10
    }
  }, [fanalty, blood])

  return fanalty >= 3 && <primitive object={blood.scene} scale={34} />
}

export default Blood
