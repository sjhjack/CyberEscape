import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Tumbler = () => {
  const tumbler = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy2/tumbler.glb",
    "/glb/ssafy2/tumbler.glb",
    true,
  )

  useEffect(() => {
    if (tumbler.scene) {
      tumbler.scene.position.set(0, 5.6, -70)
      tumbler.scene.rotation.set(0, -1.58, 0)
    }
  }, [tumbler])

  return <primitive object={tumbler.scene} scale={1} />
}

export default Tumbler
