import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void
}

const RoomModel = ({ onLoaded }: RoomProps) => {
  const gltf = useGLTF(
    // "/glb/textureapply65.glb",
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/textureapply69.glb",
    true,
  )

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

export default RoomModel

// import { useEffect } from "react"
// import { useFBX } from "@react-three/drei"
// import { Mesh } from "three"

// interface RoomProps {
//   onLoaded: (isLoaded: boolean) => void
// }

// const RoomModel = ({ onLoaded }: RoomProps) => {
//   const fbx = useFBX("/glb/sipicehazir.fbx")

//   useEffect(() => {
//     if (fbx) {
//       onLoaded(true)
//     }
//   }, [fbx, onLoaded])

//   useEffect(() => {
//     if (fbx) {
//       fbx.traverse((child) => {
//         if (child instanceof Mesh) {
//           child.castShadow = true
//           child.receiveShadow = true
//         }
//       })
//     }
//   }, [fbx])

//   return fbx ? <primitive object={fbx} scale={24} /> : null
// }

// export default RoomModel
