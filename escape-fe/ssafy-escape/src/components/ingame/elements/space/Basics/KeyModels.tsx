import React from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh, MeshStandardMaterial } from "three"

interface KeyProps {
  onClick: any
  position: [number, number, number]
  active: boolean
  setInteractNum: any
}

const KeyModels = ({ onClick, position, active, setInteractNum }: KeyProps) => {
  const { scene } = useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/key.glb")

  return (
    <>
      {active &&
        scene.children.map((child, index) => {
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

export default KeyModels
