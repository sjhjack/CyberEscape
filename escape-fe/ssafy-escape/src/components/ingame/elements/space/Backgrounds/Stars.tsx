import { useThree } from "@react-three/fiber"
import { useEffect, useMemo, useState, useRef } from "react"
import * as THREE from "three"

const Stars = ({ trigger }: any) => {
  const { scene } = useThree()
  scene.background = new THREE.Color("black")

  const starsRef = useRef<any>(null)
  const [isWarping, setIsWarping] = useState(false)

  useEffect(() => {
    if (trigger[2].activate === true) {
      setTimeout(() => {
        setIsWarping(true)
      }, 13000)
    }
  }, [trigger])

  useEffect(() => {
    if (isWarping) {
      const animateStars = () => {
        starsRef.current.position.x += 4.5
        starsRef.current.rotation.y += 0.004
        if (starsRef.current.position.x > 700) {
          starsRef.current.position.x = -700
        }
        requestAnimationFrame(animateStars)
      }
      animateStars()
    }
  }, [isWarping])

  const starsGeometry = useMemo(() => {
    const stars = []
    const minDistance = 300

    for (let i = 0; i < 10000; i++) {
      let x, y, z, distance
      do {
        x = THREE.MathUtils.randFloatSpread(1500)
        y = THREE.MathUtils.randFloatSpread(1500)
        z = THREE.MathUtils.randFloatSpread(1500)
        distance = Math.sqrt(x * x + y * y + z * z)
      } while (distance < minDistance)

      stars.push(x, y, z)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(stars, 3),
    )
    return geometry
  }, [])

  const starsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        // map: new THREE.TextureLoader().load("path_to_your_star_texture.png"),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.7,
      }),
    [],
  )

  return (
    <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />
  )
}

export default Stars
