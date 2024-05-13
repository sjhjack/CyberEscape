import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Skull = ({ onClick, solved, setInteractNum }: ClickObjectProps) => {
  const skull = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/skull.glb",
    true,
  )

  useEffect(() => {
    if (skull.scene) {
      skull.scene.position.set(-20, 6, -3)
      skull.scene.rotation.set(0, 0, 80)
    }
  }, [skull, solved])

  const handlePointerOver = () => {
    if (solved === 0) {
      setInteractNum(2)
    }
  }

  return (
    <primitive
      object={skull.scene}
      scale={40}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Skull
