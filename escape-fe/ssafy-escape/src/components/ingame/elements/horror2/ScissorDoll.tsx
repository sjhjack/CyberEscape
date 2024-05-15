import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

interface ScissorDollProps {
  fiveMinLater: boolean
}

const ScissorDoll = ({ fiveMinLater }: ScissorDollProps) => {
  const doll = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/scissor_doll.glb",
    true,
  )
  useEffect(() => {
    if (doll.scene) {
      doll.scene.position.set(-70.5, 70, 51)
      doll.scene.rotation.set(0, 2, 0)
    }
  }, [doll])
  return fiveMinLater ? <primitive object={doll.scene} scale={10} /> : null
}

export default ScissorDoll
