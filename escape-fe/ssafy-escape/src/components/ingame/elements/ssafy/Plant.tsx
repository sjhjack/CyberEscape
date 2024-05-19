import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Plant = () => {
  const plant = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy2/plant.glb",
    true,
  )

  useEffect(() => {
    if (plant.scene) {
      plant.scene.position.set(-32, 0, -45)
    }
  }, [plant])

  return <primitive object={plant.scene} scale={1} />
}

export default Plant
