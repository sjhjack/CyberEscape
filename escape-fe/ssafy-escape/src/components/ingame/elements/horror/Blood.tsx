import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

interface BloodProps {
  penalty: number
  role: "experiment" | "scientist"
}

const Blood = ({ penalty, role }: BloodProps) => {
  const blood = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/blood.glb",
    true,
  )
  useEffect(() => {
    if (blood.scene) {
      if (role === "experiment") {
        blood.scene.position.set(50, 43.3, -86)
      } else if (role === "scientist") {
        blood.scene.position.set(25, 20, -68)
      }
      blood.scene.renderOrder = 10
    }
  }, [penalty, blood])

  return penalty >= 3 ? <primitive object={blood.scene} scale={34} /> : null
}

export default Blood
