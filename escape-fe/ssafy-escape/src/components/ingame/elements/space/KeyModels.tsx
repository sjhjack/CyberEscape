import React from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

interface KeyProps {
  onClick: any
  position: [number, number, number]
  active: boolean
}

const KeyModels = ({ onClick, position, active }: KeyProps) => {
  const { scene } = useGLTF("/glb/key.glb")

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
                scale={[0.05, 0.05, 0.05]}
                onClick={onClick}
                onPointerOver={() => {
                  document.body.style.cursor = "pointer"
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto"
                }}
              />
            )
          }
          return null
        })}
    </>
  )
}

export default KeyModels
