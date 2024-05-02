import { ReactNode, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import Crosshair from "./Crosshair"

const CustomPointerLockControls = () => {
  return <PointerLockControls />
}

const BasicScene = ({ children }: { children: ReactNode }) => {
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
      <Canvas shadows camera={{ fov: 50 }}>
        <Physics gravity={[0, -9.8, 0]}>{children}</Physics>
        <CustomPointerLockControls />
      </Canvas>
      {isPointerLocked && <Crosshair />}
    </div>
  )
}

export default BasicScene
