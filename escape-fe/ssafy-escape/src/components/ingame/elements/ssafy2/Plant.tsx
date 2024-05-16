import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Plant = () => {
  const plant = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy2/plant.glb",
    "/glb/ssafy2/plant.glb",
    true,
  )

  useEffect(() => {
    if (plant.scene) {
      plant.scene.position.set(3, 5.6, -60)
      plant.scene.rotation.set(0, -1.58, 0)
    }
  }, [plant])

  return <primitive object={plant.scene} scale={1} />
}

export default Plant
