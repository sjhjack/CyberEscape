import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { Mesh } from "three"

// 로딩 오래 걸리는 큰 모델들은 onLoaded 적용해서 나머지 요소들과 함께 출력되도록 처리
const HorrorRoom = ({ onLoaded }: RoomProps) => {
  const { scene } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/horror_room.glb",
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

  return <primitive object={scene} scale={35} />
}

export default HorrorRoom
