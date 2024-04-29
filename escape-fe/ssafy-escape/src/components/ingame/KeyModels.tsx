import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

// for merge request

interface KeyProps {
  onClick: () => void
}

const KeyModels = ({ onClick }: KeyProps) => {
  const { scene } = useGLTF("/glb/key.glb")

  return (
    <>
      {scene.children.map((child, index) => {
        if (child instanceof Mesh) {
          return (
            <mesh
              key={index}
              geometry={child.geometry}
              material={child.material}
              position={[0.88, 1.15, 3.8]}
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
