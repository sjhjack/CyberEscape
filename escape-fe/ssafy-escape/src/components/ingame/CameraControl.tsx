import { useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const CameraControl = () => {
  const { camera } = useThree()
  const positionRef = useRef(new THREE.Vector3(4, 3, -2))
  const [position, setPosition] = useState(new THREE.Vector3(4, 3, -2))
  const [moveDirection, setMoveDirection] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    camera.near = 0.1
    camera.far = 1000000
    camera.updateProjectionMatrix()
  }, [camera])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "w":
          setMoveDirection((prev) => ({ ...prev, forward: true }))
          break
        case "s":
          setMoveDirection((prev) => ({ ...prev, backward: true }))
          break
        case "a":
          setMoveDirection((prev) => ({ ...prev, left: true }))
          break
        case "d":
          setMoveDirection((prev) => ({ ...prev, right: true }))
          break
        default:
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "w":
          setMoveDirection((prev) => ({ ...prev, forward: false }))
          break
        case "s":
          setMoveDirection((prev) => ({ ...prev, backward: false }))
          break
        case "a":
          setMoveDirection((prev) => ({ ...prev, left: false }))
          break
        case "d":
          setMoveDirection((prev) => ({ ...prev, right: false }))
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const updatePosition = () => {
      let direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      direction.normalize()

      let left = new THREE.Vector3()
      left.crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize()

      let newPosition = position.clone()
      positionRef.current = newPosition

      const moveDistance = 10

      if (moveDirection.forward) {
        newPosition.addScaledVector(direction, moveDistance)
      }
      if (moveDirection.backward) {
        newPosition.addScaledVector(direction, -5)
      }
      if (moveDirection.left) {
        newPosition.addScaledVector(left, 5)
      }
      if (moveDirection.right) {
        newPosition.addScaledVector(left, -5)
      }

      newPosition.y = position.y

      if (!position.equals(newPosition)) {
        setPosition(newPosition)
        camera.position.set(newPosition.x, newPosition.y, newPosition.z)
      }

      animationFrameId = requestAnimationFrame(updatePosition)
    }

    const isMoving = Object.values(moveDirection).some((value) => value)
    if (isMoving) {
      animationFrameId = requestAnimationFrame(updatePosition)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [camera, position, moveDirection])

  return null
}

export default CameraControl
