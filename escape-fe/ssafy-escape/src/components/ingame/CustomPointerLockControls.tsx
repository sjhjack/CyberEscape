import { useEffect, useRef } from "react"
import { useThree } from "@react-three/fiber"
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls.js"

const CustomPointerLockControls = () => {
  const { camera, gl } = useThree()
  const controlsRef = useRef<PointerLockControlsImpl | null>(null)

  useEffect(() => {
    const controls = new PointerLockControlsImpl(camera, gl.domElement)
    controlsRef.current = controls

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        controls.connect()
        setTimeout(() => {
          controls.lock()
        }, 100)
      } else {
        setTimeout(() => {
          controls.disconnect()
          controls.unlock()
        }, 100)
      }
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange)

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange)
    }
  }, [camera, gl])

  return null
}

export default CustomPointerLockControls
