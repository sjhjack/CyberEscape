import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Notebook = ({ onClick, solved, setInteractNum }: ClickObjectProps) => {
  const notebook = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy/notebook.glb",
    "/glb/ssafy/notebook.glb",
    true,
  )

  useEffect(() => {
    if (notebook.scene) {
      notebook.scene.position.set(26.8, 30, 24.75)
      notebook.scene.rotation.set(0, -1.58, 0)
    }
  }, [notebook, solved])

  const handlePointerOver = () => {
    if (solved === 0) {
      setInteractNum(2)
    }
  }

  return (
    <primitive
      object={notebook.scene}
      scale={5}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Notebook
