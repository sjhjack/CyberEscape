import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useThree, extend } from "@react-three/fiber"
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing"
import { Mesh } from "three"
import { useControls } from "leva"

const LEDLight = () => {
  //   const { scene } = useGLTF("/glb/led3.glb")

  const { enabled, hue, saturation } = useControls("HueSaturation", {
    enabled: { value: true },
    hue: {
      value: 10,
      min: 0,
      max: Math.PI,
      step: 0.1,
    },
    saturation: {
      value: 10,
      min: 0,
      max: Math.PI,
      step: 0.1,
    },
  })

  const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
    useControls("Bloom", {
      intensity: { value: 1000, min: 3, max: 100, step: 0.01 },
      mipmapBlur: { value: true },
      luminanceThreshold: { value: 0.5, min: 0, max: 1, step: 0.01 },
      luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
      strength: { value: 100 },
    })

  return (
    <>
      <EffectComposer>
        <Bloom
          intensity={intensity}
          mipmapBlur={mipmapBlur}
          luminanceSmoothing={luminanceSmoothing}
          luminanceThreshold={luminanceThreshold}
        />
      </EffectComposer>
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#e74c3c"
          roughness={0.2}
          metalness={0.5}
          emissive={"#e74c3c"}
          toneMapped={false}
          emissiveIntensity={10}
        />
      </mesh>
    </>
  )
}
export default LEDLight
