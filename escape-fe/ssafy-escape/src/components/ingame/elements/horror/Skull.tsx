import { useGLTF } from "@react-three/drei"
// import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"

const Skull = () => {
  const skull = useGLTF("/glb/skull.glb", true)
  // const { scene } = useThree()

  useEffect(() => {
    skull.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [skull])

  // useEffect(() => {
  //   const light = new THREE.DirectionalLight("#ff0000", 5)
  //   light.position.set(10, 2.5, -72)
  //   scene.add(light)

  //   return () => {
  //     scene.remove(light)
  //   }
  // }, [scene])

  useEffect(() => {
    if (skull.scene) {
      skull.scene.position.set(10, 2.5, -72)
    }
  }, [skull])

  return <primitive object={skull.scene} scale={60} />
}

export default Skull
