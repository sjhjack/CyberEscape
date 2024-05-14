import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const CreepycreepyDoll = ({ solved }: SolvedObjectProps) => {
  const creepyDoll = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/horror_doll.glb",
    true,
  )
  useEffect(() => {
    if (creepyDoll.scene) {
      creepyDoll.scene.position.set(71, 23.5, -1.8)
      creepyDoll.scene.rotation.set(0, -1.55, 0)
    }
  }, [creepyDoll, solved])
  return solved === 2 ? (
    <primitive object={creepyDoll.scene} scale={10} />
  ) : null
}

export default CreepycreepyDoll
