import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

interface BloodProps {
  penalty: number
}

const Blood = ({ penalty }: BloodProps) => {
  const blood = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/blood.glb",
    true,
  )
  useEffect(() => {
    if (blood.scene) {
      blood.scene.position.set(50, 43.3, -86)
      blood.scene.renderOrder = 10
    }
  }, [penalty, blood])

  return penalty >= 3 && <primitive object={blood.scene} scale={34} />
}

export default Blood
