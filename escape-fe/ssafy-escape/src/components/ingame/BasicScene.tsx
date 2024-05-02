import { ReactNode, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import Lights from "./elements/space/Lights"
import Floor from "./elements/common/Floor"
import Crosshair from "./Crosshair"
import MeshObjects from "./elements/space/MeshObjects"

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
        <Lights />
        <Physics gravity={[0, -9.8, 0]}>
          {children}
          <MeshObjects />
          <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
        </Physics>
        <CustomPointerLockControls />
      </Canvas>
      {isPointerLocked && <Crosshair />}
    </div>
  )
}

export default BasicScene
