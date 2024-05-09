import { useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import * as THREE from "three"

const Stars = () => {
  const { scene } = useThree()
  scene.background = new THREE.Color("black")

  useEffect(() => {
    const stars = new Array(0)
    for (let i = 0; i < 10000; i++) {
      let x = THREE.MathUtils.randFloatSpread(2000)
      let y = THREE.MathUtils.randFloatSpread(2000)
      let z = THREE.MathUtils.randFloatSpread(2000)
      stars.push(x, y, z)
    }

    const starsGeometry = new THREE.BufferGeometry()
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(stars, 3),
    )
    const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 })
    const starField = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starField)

    // Clean up
    return () => {
      scene.remove(starField)
    }
  }, [scene])

  const starsGeometry = useMemo(() => {
    const stars = new Array(0)
    for (let i = 0; i < 10000; i++) {
      let x = THREE.MathUtils.randFloatSpread(2000)
      let y = THREE.MathUtils.randFloatSpread(2000)
      let z = THREE.MathUtils.randFloatSpread(2000)
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
    () => new THREE.PointsMaterial({ color: 0x888888 }),
    [],
  )

  const starsField = useMemo(
    () => <points geometry={starsGeometry} material={starsMaterial} />,
    [starsGeometry, starsMaterial],
  )

  return starsField
}

export default Stars
