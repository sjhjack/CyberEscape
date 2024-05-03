import { useGLTF } from "@react-three/drei"
// import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Mesh } from "three"
// import * as THREE from "three"

type Props = {
  onClick: () => void
}

const Flower = ({ onClick }: Props) => {
  const flower = useGLTF("/glb/horror/flower.glb", true)
  // const { scene } = useThree()

  useEffect(() => {
    flower.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [flower])

  useEffect(() => {
    if (flower.scene) {
      flower.scene.position.set(1.4582, 1, -5.3756)
      //   flower.scene.rotation.set(
      //     (50.352 * Math.PI) / 180,
      //     (-30.85 * Math.PI) / 180,
      //     (-35.131 * Math.PI) / 180,
      //   )
    }
  }, [flower])

  // useEffect(() => {
  //   const light = new THREE.DirectionalLight(0xffffff, 1)
  //   light.position.set(2, 3, -1)
  //   scene.add(light)

  //   return () => {
  //     scene.remove(light)
  //   }
  // }, [scene])

  return (
    <primitive
      object={flower.scene}
      scale={35}
      onClick={onClick}
    />
  )
}

export default Flower
