import * as THREE from "three"
import { useControls } from "leva"
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing"

const Venus = () => {
  const venusTexture = new THREE.TextureLoader().load(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/image/suntexture.jpg",
  )
  const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture,
    emissive: "red",
    emissiveIntensity: 2.5,
  })
  const venusGeometry = new THREE.SphereGeometry(50, 64, 64)
  const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial)

  // const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
  //   useControls("Bloom", {
  //     intensity: { value: 1, min: 1, max: 10, step: 0.01 },
  //     mipmapBlur: { value: true },
  //     luminanceThreshold: { value: 0.1, min: 0, max: 1, step: 0.01 },
  //     luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
  //     strength: { value: 1 },
  //   })

  return (
    <>
      {/* <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          intensity={1}
          mipmapBlur={true}
          luminanceSmoothing={0.2}
          luminanceThreshold={0.1}
        />
      </EffectComposer> */}
      <primitive object={venusMesh} position={[-300, 0, -150]} />
    </>
  )
}

export default Venus
