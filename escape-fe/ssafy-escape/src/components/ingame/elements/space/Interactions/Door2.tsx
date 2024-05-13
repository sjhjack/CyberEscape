import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { AnimationMixer } from "three"
import DoorBox from "../../common/DoorBox"
import * as THREE from "three"

const Door2 = ({ position, rotation, setInteractNum }: any) => {
  const { scene } = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door4.glb",
    "/glb/door_02.glb",
    true,
  )
  const doorRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (scene) {
      setIsLoaded(true)
    }
  }, [scene])

  const handleClick = () => {
    // 유머 방송
  }

  return isLoaded ? (
    <>
      <primitive
        object={scene}
        ref={doorRef}
        scale={24}
        position={position}
        rotation={rotation}
        onClick={handleClick}
        onPointerOver={() => {
          setInteractNum(3)
        }}
        onPointerOut={() => {
          setInteractNum(1)
        }}
      />
      <DoorBox position={position} args={[2, 20, 10]} color={"red"} />
    </>
  ) : null
}

export default Door2
