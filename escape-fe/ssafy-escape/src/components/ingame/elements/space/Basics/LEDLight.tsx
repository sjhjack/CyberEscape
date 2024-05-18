import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useThree, extend } from "@react-three/fiber"
import { Mesh } from "three"

const LEDLight = () => {
  //   const { scene } = useGLTF("/glb/led3.glb")

  // const { enabled, hue, saturation } = useControls("HueSaturation", {
  //   enabled: { value: true },
  //   hue: {
  //     value: 10,
  //     min: 0,
  //     max: Math.PI,
  //     step: 0.1,
  //   },
  //   saturation: {
  //     value: 10,
  //     min: 0,
  //     max: Math.PI,
  //     step: 0.1,
  //   },
  // })

  return (
    <>
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#e74c3c"
          roughness={0.2}
          metalness={0.5}
          emissive={"#e74c3c"}
          toneMapped={false}
          emissiveIntensity={5}
        />
      </mesh>
    </>
  )
}
export default LEDLight
