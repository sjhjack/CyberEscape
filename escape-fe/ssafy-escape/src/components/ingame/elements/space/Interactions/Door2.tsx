import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { AnimationMixer } from "three"
import DoorBox from "../../common/DoorBox"
import * as THREE from "three"

const Door2 = ({
  onAir,
  setOnAir,
  position,
  rotation,
  setSubtitle,
  setInteractNum,
}: any) => {
  const { scene } = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door4.glb",
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door_02.glb",
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
    if (onAir) return
    setOnAir(true)
    // 유머 방송
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/already_escaped.mp3",
    )
    audio.play()
    setSubtitle("정우님의 방입니다. 이미 탈출하셨습니다.")
    setTimeout(() => {
      setOnAir(false)
      setSubtitle(null)
    }, 2500)
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
