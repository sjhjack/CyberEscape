import { ReactNode, useState, useEffect, useRef, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls.js"
import { Physics } from "@react-three/cannon"
import PlayMusic from "./PlayMusic"
import Crosshair from "./Crosshair"
import styled from "styled-components"

interface BasicSceneProps {
  onAir: boolean
  interactNum: number
  children: ReactNode
  mouseSpeed: number
}

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: cursor;
  z-index: 0;
`

const BasicScene = ({
  onAir,
  interactNum,
  children,
  mouseSpeed,
}: BasicSceneProps) => {
  const [isPointerLocked, setIsPointerLocked] = useState(false)

  const controlsRef = useRef<any>()

  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(
        document.pointerLockElement === controlsRef.current.domElement,
      )
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange)

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange)
    }
  }, [])

  const handlePointerLock = () => {
    const element = controlsRef.current.domElement
    element.requestPointerLock()
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* <PlayMusic /> */}
      <Canvas shadows camera={{ fov: 50 }}>
        <Physics gravity={[0, -9.8, 0]}>{children}</Physics>
        <PointerLockControls ref={controlsRef} pointerSpeed={mouseSpeed} />
      </Canvas>
      <FullScreenOverlay onClick={handlePointerLock}></FullScreenOverlay>
      {isPointerLocked && <Crosshair interactNum={interactNum} />}
    </div>
  )
}

export default BasicScene
