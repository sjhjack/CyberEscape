import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { Mesh } from "three"

type RoomProps = {
  onLoaded: (isLoaded: boolean) => void
}

// 로딩 오래걸리는 큰 모델들은 onLoaded 적용해서 나머지 요소들이랑 함께 출력되도록 처리
const SsafyClassRoom = ({ onLoaded }: RoomProps) => {
  const gltf = useGLTF("/glb/conference_room.glb", true)

  useEffect(() => {
    if (gltf) {
      onLoaded(true)
    }
  }, [gltf, onLoaded])

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene} scale={35} />
}

export default SsafyClassRoom
