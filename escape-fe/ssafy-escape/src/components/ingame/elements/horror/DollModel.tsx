import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Mesh } from "three"
import * as THREE from "three"

type DollProps = {
  onClick: () => void
}

const DollModel = ({ onClick }: DollProps) => {
  const doll = useGLTF("/glb/doll.glb", true)
  const { scene } = useThree()

  useEffect(() => {
    doll.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.roughness = 2
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [doll])

  useEffect(() => {
    if (doll.scene) {
      doll.scene.position.set(2, 3, -2)
    }
  }, [doll])

  useEffect(() => {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2, 3, -1)
    scene.add(light)

    return () => {
      scene.remove(light)
    }
  }, [scene])

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"
  }

  const handlePointerOut = () => {
    document.body.style.cursor = "default"
  }

  return (
    <primitive
      object={doll.scene}
      scale={0.05}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  )
}

export default DollModel