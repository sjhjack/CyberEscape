import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"

export interface CameraMoveToPositionRef {
  moveToPosition: (x: number, y: number, z: number) => void
}

const CameraMoveToPosition = forwardRef<CameraMoveToPositionRef, {}>(
  (props, ref) => {
    const { camera } = useThree()
    const [targetPosition, setTargetPosition] = useState({ x: 4, y: 3, z: -2 })
    const [isMoving, setIsMoving] = useState(true)

    useImperativeHandle(ref, () => ({
      moveToPosition: (x: number, y: number, z: number) => {
        setTargetPosition({ x, y, z })
        setIsMoving(true)
      },
    }))

    useEffect(() => {
      camera.position.set(8, 8, -2)
      camera.lookAt(-4, 2, 2)
      camera.updateProjectionMatrix()
    }, [camera])

    useEffect(() => {
      camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z)
      camera.zoom = 2.5
      camera.updateProjectionMatrix()
    }, [camera, targetPosition])

    useFrame((_, delta) => {
      if (isMoving) {
        const dx = targetPosition.x - camera.position.x
        const dy = targetPosition.y - camera.position.y
        const dz = targetPosition.z - camera.position.z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const speed = 0.3 * delta

        if (distance < 0.1) {
          setIsMoving(false)
          camera.position.set(
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
          )
        } else {
          const factor = Math.min(distance * speed, 1)
          camera.position.x += dx * factor
          camera.position.y += dy * factor
          camera.position.z += dz * factor
        }

        camera.lookAt(-4, 2, 2)
        camera.updateProjectionMatrix()
      }
    })

    return null
  },
)

export default CameraMoveToPosition
