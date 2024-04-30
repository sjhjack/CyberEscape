import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls.js"

interface PointerLockControlsProps {
  startPosition: { x: number; y: number; z: number }
  startTargetPosition: { x: number; y: number; z: number }
  zoom: number
  lookAt: { x: number; y: number; z: number }
  cameraMovingSpeed: number
}

// 렌더링 시 startPosition -> startTargetPosition으로 카메라 이동
// 이 때 카메라의 확대 정도(zoom), 카메라가 바라보는 방향(lookAt), 카메라가 이동하는 속도(cameraMovingSpeed) 조절 가능
const PointerLockControls = forwardRef(
  (props: PointerLockControlsProps, ref) => {
    const {
      startPosition,
      startTargetPosition,
      zoom,
      lookAt,
      cameraMovingSpeed,
    } = props
    const { camera, gl } = useThree()
    const [targetPosition, setTargetPosition] = useState(startTargetPosition)
    const [isMoving, setIsMoving] = useState(true)

    useImperativeHandle(ref, () => ({
      moveToPosition: (x: number, y: number, z: number) => {
        setTargetPosition({ x, y, z })
        setIsMoving(true)
      },
    }))

    useEffect(() => {
      camera.position.set(startPosition.x, startPosition.y, startPosition.z)
      camera.zoom = zoom
      camera.lookAt(lookAt.x, lookAt.y, lookAt.z)
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

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(dz) < 0.1) {
          setIsMoving(false)
        } else {
          camera.position.x += dx * cameraMovingSpeed
          camera.position.y += dy * cameraMovingSpeed
          camera.position.z += dz * cameraMovingSpeed
        }

        camera.lookAt(lookAt.x, lookAt.y, lookAt.z)
        camera.updateProjectionMatrix()
      }
    })
    PointerLockControls.displayName = "PointerLockControls"
    return null
  },
)

export default PointerLockControls
