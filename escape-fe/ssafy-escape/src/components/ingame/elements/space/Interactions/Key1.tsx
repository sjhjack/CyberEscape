import React, { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh, MeshStandardMaterial } from "three"

// interface KeyProps {
//   onClick: any
//   position: [number, number, number]
//   active: boolean
//   setInteractNum: any
// }

const Key1 = ({
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  const { scene } = useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/key.glb")

  const possibleLocations = [
    [-54, 1.6, -131],
    [-51, 1.6, -113],
    [-54, 1.6, -178],
    [-12, 1.6, -182],
    [1, 1.6, -152],
  ]

  const [position, setPosition] = useState<any>([100, 100, 100])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * possibleLocations.length)
    setPosition(possibleLocations[randomIndex])
  }, [])

  const onClick = () => {
    const updatedSequence = [...sequences]
    updatedSequence[0] = { ...updatedSequence[0], done: true }
    setSequences(updatedSequence)
    setInteractNum(1)
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/key1_find.mp3",
    )
    audio.play()
    setSubtitle("잘 찾으셨습니다. 이제 조종실로 가세요.")
    setTimeout(() => {
      setSubtitle(null)
    }, 3500)
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
              position={position}
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

export default Key1
