import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { Mesh } from "three"

const SsafyOffice = ({ onLoaded }: RoomProps) => {
  const { scene } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy2/office.glb",
    true,
  )

  useEffect(() => {
    if (scene) {
      scene.renderOrder = 0
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      onLoaded(true)
    }
  }, [scene, onLoaded])

  return <primitive object={scene} scale={10} />
}

export default SsafyOffice
