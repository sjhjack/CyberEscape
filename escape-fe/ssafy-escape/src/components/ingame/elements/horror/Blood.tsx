import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Blood = () => {
  const blood = useGLTF("/glb/blood.glb", true)
  useEffect(() => {
    if (blood.scene) {
      blood.scene.position.set(50, 42.5, -86)
      blood.scene.renderOrder = 10
    }
  }, [blood])

  return <primitive object={blood.scene} scale={35} />
}

export default Blood
