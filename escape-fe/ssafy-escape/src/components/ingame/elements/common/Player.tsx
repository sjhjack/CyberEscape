import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { usePlayerControls } from "./Helpers"
import * as THREE from "three"

const Player = (props: any) => {
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const speed = new THREE.Vector3()
  const SPEED = 15

  const { camera } = useThree()

  const [ref, api] = useSphere((index) => ({
    mass: 1,
    type: "Dynamic",
    ...props,
  }))

  const { forward, backward, left, right, jump } = usePlayerControls()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.getWorldPosition(camera.position)
      camera.position.y = props.position[1] + 4
    }
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(Number(velocity.current[1].toFixed(2))) < 0.05)
      api.velocity.set(velocity.current[0], 5, velocity.current[2])
  })

  return (
    <group>
      <mesh
        castShadow
        position={props.position}
        ref={ref as React.MutableRefObject<THREE.Mesh>}
      >
        <sphereGeometry args={[2, 5, 5]} />
        <meshStandardMaterial color="#ff0000" opacity={0} transparent />
      </mesh>
    </group>
  )
}

export default Player
