import { ReactNode, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import PlayMusic from "./PlayMusic"
import Crosshair from "./Crosshair"

interface BasicSceneProps {
  onAir: boolean
  interactNum: number
  children: ReactNode
}

const CustomPointerLockControls = () => {
  return (
    <>
      <PointerLockControls pointerSpeed={0.4} />
    </>
  )
}

const BasicScene = ({ onAir, interactNum, children }: BasicSceneProps) => {
  const [isPointerLocked, setIsPointerLocked] = useState(false)

  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null)
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange)

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange)
    }
  }, [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <PlayMusic />
      <Canvas shadows camera={{ fov: 50 }}>
        <Physics gravity={[0, -9.8, 0]}>{children}</Physics>
        <CustomPointerLockControls />
      </Canvas>
      {isPointerLocked && <Crosshair interactNum={interactNum} />}
    </div>
  )
}

export default BasicScene
