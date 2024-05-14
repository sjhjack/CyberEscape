import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const VoodooDoll = ({ solved }: SolvedObjectProps) => {
  const voodooDoll = useGLTF("/glb/horror2/voodoo_doll.glb", true)
  const bloodPool1 = useGLTF("/glb/horror/pool_blood1.glb", true)
  useEffect(() => {
    if (voodooDoll.scene && bloodPool1.scene) {
      voodooDoll.scene.position.set(40, 13, -40)
      bloodPool1.scene.position.set(28, 11.5, -52)
    }
  }, [voodooDoll, bloodPool1, solved])

  return solved === 3 ? (
    <>
      <primitive object={voodooDoll.scene} scale={1} />
      <primitive object={bloodPool1.scene} scale={500} />
    </>
  ) : null
}

export default VoodooDoll
