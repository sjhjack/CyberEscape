import { useFrame, useThree } from "@react-three/fiber"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls.js"

// for merge request

interface CustomWindow extends Window {
  pointerLockControls?: PointerLockControlsImpl
}

declare var window: CustomWindow

const PointerLockControls = forwardRef((props, ref) => {
  const { camera, gl } = useThree()
  const [startPosition] = useState({ x: 4, y: 16, z: -2 })
  const [targetPosition, setTargetPosition] = useState({ x: 4, y: 16, z: -2 })
  const [isMoving, setIsMoving] = useState(true)

  useImperativeHandle(ref, () => ({
    moveToPosition: (x: number, y: number, z: number) => {
      setTargetPosition({ x, y, z })
      setIsMoving(true)
    },
  }))

  useEffect(() => {
    const canvas = document.querySelector("canvas")
    camera.position.set(startPosition.x, startPosition.y, startPosition.z)
    console.log(camera.position)
    camera.zoom = 2.5
    camera.lookAt(-4, 2, 2)
    camera.updateProjectionMatrix()

    const controls = new PointerLockControlsImpl(camera, gl.domElement)
    window.pointerLockControls = controls

    const onPointerLockChange = () => {
      if (!document.pointerLockElement) {
        window.pointerLockControls?.unlock()
      }
    }

    document.addEventListener("pointerlockchange", onPointerLockChange)

    return () => {
      controls.dispose()
      window.pointerLockControls = undefined
      document.removeEventListener("pointerlockchange", onPointerLockChange)
    }
  }, [camera, gl.domElement, startPosition])

  useFrame(() => {
    if (isMoving) {
      const dx = targetPosition.x - camera.position.x
      const dy = targetPosition.y - camera.position.y
      const dz = targetPosition.z - camera.position.z

      const speed = 0.03

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(dz) < 0.1) {
        setIsMoving(false)
      } else {
        camera.position.x += dx * speed
        camera.position.y += dy * speed
        camera.position.z += dz * speed
      }

      camera.lookAt(-4, 2, 2)
      camera.updateProjectionMatrix()
    }
  })
  PointerLockControls.displayName = "PointerLockControls"
  return null
})

export default PointerLockControls
