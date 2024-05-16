import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Diary = ({ onClick, setInteractNum }: ClickObjectProps) => {
  const diary = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy2/diary.glb",
    "/glb/ssafy2/diary.glb",
    true,
  )

  useEffect(() => {
    if (diary.scene) {
      diary.scene.position.set(0, 5.6, -65)
      diary.scene.rotation.set(0, -1.58, 0)
    }
  }, [diary])

  return (
    <primitive
      object={diary.scene}
      scale={1}
      onPointerOver={() => setInteractNum(2)}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Diary
