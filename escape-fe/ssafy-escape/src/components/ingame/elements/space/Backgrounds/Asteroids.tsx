import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const Asteroids = () => {
  const { scene } = useThree()
  const asteroidsGroup = useRef<THREE.Group>()

  useEffect(() => {
    const numAsteroids = 50
    const asteroids = []

    for (let i = 0; i < numAsteroids; i++) {
      const asteroidSize = Math.random() * 10 + 10
      const asteroidGeometry = new THREE.SphereGeometry(asteroidSize, 16, 16)

      const textureLoader = new THREE.TextureLoader()
      const asteroidTexture = textureLoader.load(
        process.env.NEXT_PUBLIC_IMAGE_URL + "image/asteroidtexture.jpg",
      )
      const asteroidMaterial = new THREE.MeshStandardMaterial({
        map: asteroidTexture,
      })

      const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial)

      asteroidMesh.position.x = Math.random() * 500 - 600
      asteroidMesh.position.y = Math.random() * 500 - 100
      asteroidMesh.position.z = Math.random() * 500 - 200

      asteroidMesh.rotation.x = Math.random() * Math.PI * 2
      asteroidMesh.rotation.y = Math.random() * Math.PI * 2
      asteroidMesh.rotation.z = Math.random() * Math.PI * 2

      const direction = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize()
      asteroidMesh.userData.direction = direction

      asteroids.push(asteroidMesh)
    }

    asteroidsGroup.current = new THREE.Group()
    asteroidsGroup.current.add(...asteroids)

    scene.add(asteroidsGroup.current)

    return () => {
      if (asteroidsGroup.current) {
        scene.remove(asteroidsGroup.current)
      }
    }
  }, [])

  useFrame(({ clock }) => {
    if (asteroidsGroup.current) {
      asteroidsGroup.current.children.forEach((asteroid) => {
        const speed = 0.002

        asteroid.position.x += asteroid.userData.direction.x * 0.05 // Adjust speed as needed
        asteroid.position.y += asteroid.userData.direction.y * 0.05
        asteroid.position.z += asteroid.userData.direction.z * 0.05

        asteroid.rotation.x += 0.001
        asteroid.rotation.y += 0.001
        asteroid.rotation.z += 0.001
      })
    }
  })

  return null
}

export default Asteroids
