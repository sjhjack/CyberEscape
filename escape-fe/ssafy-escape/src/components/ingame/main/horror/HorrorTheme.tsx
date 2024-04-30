import { Canvas } from "@react-three/fiber"
import CameraControl from "@/components/ingame/CameraControl"
import DollModel from "@/components/ingame/elements/horror/DollModel"
import HorrorRoomModel from "@/components/ingame/elements/horror/HorrorRoomModel"
import PointerLockControls from "@/components/ingame/PointerLockControls"

const startPosition = { x: 8, y: 8, z: -2 }
const startTargetPosition = { x: 4, y: 3, z: -2 }
const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const handleDoll = () => {
    console.log("인형클릭")
  }

  return (
    <Canvas
      shadows
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        castShadow
        receiveShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <HorrorRoomModel onLoaded={setIsModelLoaded} />
      <DollModel onClick={handleDoll} />
      <PointerLockControls
        startPosition={startPosition}
        startTargetPosition={startTargetPosition}
        cameraMovingSpeed={0.03}
        lookAt={lookAt}
        zoom={2.5}
      />
      {isGameStart ? (
        <CameraControl startPosition={startTargetPosition} movingSpeed={0.05} />
      ) : null}
    </Canvas>
  )
}

export default HorrorTheme
