import React from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh, MeshStandardMaterial } from "three"

// interface KeyProps {
//   onClick: any
//   position: [number, number, number]
//   active: boolean
//   setInteractNum: any
// }

const Key1 = ({ sequences, setSequences, setInteractNum }: any) => {
  const { scene } = useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/key.glb")

  const onClick = () => {
    const updatedSequence = [...sequences]
    updatedSequence[0] = { ...updatedSequence[0], done: true }
    setSequences(updatedSequence)
    setInteractNum(1)
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
              position={[-13, 1.2, -168]}
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
