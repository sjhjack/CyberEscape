"use client"
import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import RoomModel from "@/components/ingame/elements/space/RoomModel"
import PointerLockControls from "@/components/ingame/PointerLockControl"
import CameraKeyControls from "@/components/ingame/CameraControl"
import Player from "../../elements/space/Player"
import Plane from "../../elements/space/Floor"

interface PointerLockControlsMethods {
  moveToPosition: (x: number, y: number, z: number) => void
}

const SpaceTheme = ({ isGameStart, setIsModelLoaded }: any) => {
  const pointerLockControlsRef = useRef<PointerLockControlsMethods | null>(null)

  return (
    <Canvas
      shadows
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight
        position={[1, 1, 5]}
        intensity={1}
        castShadow
        receiveShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Physics>
        <Player />
        <Plane />
        <RoomModel onLoaded={setIsModelLoaded} />
      </Physics>
      <PointerLockControls ref={pointerLockControlsRef} />
      {isGameStart ? <CameraKeyControls /> : null}
    </Canvas>
  )
}

export default SpaceTheme
