import * as THREE from "three"

const Venus = () => {
  const venusTexture = new THREE.TextureLoader().load("/image/suntexture.jpg")
  const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture,
    emissive: "red",
  })
  const venusGeometry = new THREE.SphereGeometry(50, 32, 32)
  const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial)

  return <primitive object={venusMesh} position={[-200, 0, 0]} />
}

export default Venus
