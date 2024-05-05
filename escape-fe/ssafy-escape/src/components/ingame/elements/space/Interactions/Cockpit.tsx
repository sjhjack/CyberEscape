import React, { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { MeshBasicMaterial, BoxGeometry } from "three"

const Cockpit = ({ position }: any) => {
  const meshRef = useRef()

  const geometry = useMemo(() => new BoxGeometry(10, 10, 10), [])

  const material = useMemo(() => new MeshBasicMaterial({ color: 0xff0000 }), [])

  const { camera, invalidate } = useThree() // Access camera and invalidate function

  const handleClick = () => {
    // Change camera position or rotation as desired
    camera.position.set(0, 0, 20) // Example: move the camera 20 units along the z-axis
    camera.lookAt(position[0], position[1], position[2]) // Example: make the camera look at the clicked object
    invalidate() // Invalidate to trigger re-render with new camera position
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(position[0], position[1], position[2])
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      onClick={handleClick}
    />
  )
}

export default Cockpit
