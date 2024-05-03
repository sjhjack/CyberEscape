import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const Asteroids = () => {
  const { scene } = useThree()
  const asteroidsGroup = useRef()

  useEffect(() => {
    const numAsteroids = 50
    const asteroids = []

    for (let i = 0; i < numAsteroids; i++) {
      const asteroidSize = Math.random() * 10 + 10 // Random size between 10 and 30
      const asteroidGeometry = new THREE.SphereGeometry(asteroidSize, 16, 16)

      // Apply texture to the asteroid
      const textureLoader = new THREE.TextureLoader()
      const asteroidTexture = textureLoader.load("image/asteroidtexture.jpg")
      const asteroidMaterial = new THREE.MeshStandardMaterial({
        map: asteroidTexture,
      })

      const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial)

      // Randomly position asteroids within the space
      asteroidMesh.position.x = Math.random() * 500 - 600
      asteroidMesh.position.y = Math.random() * 500 - 100
      asteroidMesh.position.z = Math.random() * 500 - 200

      // Randomly rotate asteroids
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

    // Group all asteroids together
    asteroidsGroup.current = new THREE.Group()
    asteroidsGroup.current.add(...asteroids)

    // Add asteroids group to the scene
    scene.add(asteroidsGroup.current)

    return () => {
      scene.remove(asteroidsGroup.current)
    }
  }, [])

  useFrame(({ clock }) => {
    if (asteroidsGroup.current) {
      asteroidsGroup.current.children.forEach((asteroid) => {
        // Define a speed factor
        const speed = 0.002

        // Update asteroid positions (e.g., move them along a random direction)
        asteroid.position.x += asteroid.userData.direction.x * 0.05 // Adjust speed as needed
        asteroid.position.y += asteroid.userData.direction.y * 0.05
        asteroid.position.z += asteroid.userData.direction.z * 0.05

        // Rotate asteroid
        asteroid.rotation.x += 0.001
        asteroid.rotation.y += 0.001
        asteroid.rotation.z += 0.001
      })
    }
  })

  return null
}

export default Asteroids
