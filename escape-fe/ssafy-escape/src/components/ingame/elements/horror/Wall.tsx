import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Wall = () => {
  const wall = useGLTF("/glb/horror/wall.glb", true)
  useEffect(() => {
    if (wall.scene) {
      wall.scene.rotation.set(0, Math.PI, 0)
      wall.scene.renderOrder = -1
    }
  }, [wall])
  return <primitive object={wall.scene} scale={35} />
}

export default Wall
