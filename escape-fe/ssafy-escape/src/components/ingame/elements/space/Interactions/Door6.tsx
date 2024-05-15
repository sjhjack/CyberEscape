import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { AnimationMixer } from "three"
import DoorBox from "../../common/DoorBox"
import * as THREE from "three"

const Door6 = ({
  onAir,
  setOnAir,
  position,
  rotation,
  setInteractNum,
  sequences,
  setSubtitle,
}: any) => {
  const { scene, animations } = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door3.glb",
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door_06.glb",
    true,
  )
  const doorRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimationActivated, setIsAnimationActivated] = useState(false)

  useEffect(() => {
    if (!scene || !animations || animations.length === 0) return

    const mixer = new AnimationMixer(scene)
    const action = mixer.clipAction(animations[0])
    action.setLoop(THREE.LoopOnce, 1)

    if (isAnimationActivated) {
      action.play()
    } else {
      action.stop()
    }

    const update = () => {
      mixer.update(0.01)
    }

    let animateId: number

    if (isAnimationActivated) {
      animateId = requestAnimationFrame(function animate() {
        update()
        animateId = requestAnimationFrame(animate)
      })
    }

    return () => {
      if (animateId) {
        cancelAnimationFrame(animateId)
      }
      mixer.stopAllAction()
    }
  }, [scene, animations, isAnimationActivated])

  useEffect(() => {
    if (scene) {
      setIsLoaded(true)
    }
  }, [scene])

  const handleClick = () => {
    const new_audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/door_open.mp3",
    )
    new_audio.play()
    setIsAnimationActivated(true)
    setTimeout(() => {
      setIsAnimationActivated(false)
    }, 7000)
    if (sequences[3].done === true && sequences[4].done === false) {
      if (onAir) return
      setOnAir(true)
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL +
          "/dubbing/space/sequence/solve_engine.mp3",
      )
      audio.play()
      setSubtitle("문제를 해결하여 엔진을 고치세요.")
      setTimeout(() => {
        setSubtitle("잘못 조작했을 시 남은 시간이 단축될 수 있습니다.")
      }, 2000)
      setTimeout(() => {
        setSubtitle(null)
        setOnAir(false)
      }, 5000)
    }
  }

  return isLoaded ? (
    <>
      <primitive
        object={scene}
        ref={doorRef}
        scale={21}
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

export default Door6
