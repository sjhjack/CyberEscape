import React from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh, MeshStandardMaterial } from "three"

// interface KeyProps {
//   onClick: any
//   position: [number, number, number]
//   active: boolean
//   setInteractNum: any
// }

const Key2 = ({
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  //   const { scene } = useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/key.glb")
  const { scene } = useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/key2.glb")

  const onClick = () => {
    const updatedSequence = [...sequences]
    updatedSequence[2] = { ...updatedSequence[2], done: true }
    setSequences(updatedSequence)
    setInteractNum(1)
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/key2_find.mp3",
    )
    audio.play()
    setSubtitle(
      "잘 찾으셨습니다. 이제 서버실의 컴퓨터를 활용해 시스템을 재가동하세요.",
    )
    setTimeout(() => {
      setSubtitle(null)
    }, 4000)
  }

  return (
    <>
      {scene.children.map((child, index) => {
        if (child instanceof Mesh) {
          return (
            <mesh
              key={index}
              geometry={child.geometry}
              material={child.material}
              position={[-54, 1.6, -131]}
              scale={[0.2, 0.2, 0.2]}
              onClick={onClick}
              onPointerOver={() => {
                setInteractNum(2)
              }}
              onPointerOut={() => {
                setInteractNum(1)
              }}
            >
              <meshStandardMaterial color={"red"} />
            </mesh>
          )
        }
        return null
      })}
    </>
  )
}

export default Key2
