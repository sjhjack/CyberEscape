import { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { AnimationMixer } from "three"
import CockpitDoorBox from "../../common/CockpitDoorBox"
import * as THREE from "three"

const Door3 = ({
  onAir,
  setOnAir,
  sequences,
  setSequences,
  position,
  rotation,
  setSubtitle,
  setInteractNum,
}: any) => {
  const { scene, animations } = useGLTF(
    // process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door5.glb",
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/door_03.glb",
    true,
  )
  const doorRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimationActivated, setIsAnimationActivated] = useState(false)

  const alert = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/no_authorize.mp3",
    )
    audio.play()
  }

  const findkey = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/door_key.mp3",
    )
    audio.play()
  }

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
    if (sequences[0].done === true) {
      const new_audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/door_open.mp3",
      )
      new_audio.play()
      setIsAnimationActivated(true)
      setTimeout(() => {
        setIsAnimationActivated(false)
      }, 7000)
    } else if (sequences[0].done === true && sequences[1].done === false) {
      if (onAir) return
      setOnAir(true)
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL +
          "/dubbing/space/sequence/no_authorize.mp3",
      )
      audio.play()
      setSubtitle("조종석을 조작해 탈출을 시도하세요.")
      setTimeout(() => {
        setOnAir(false)
        setSubtitle(null)
      }, 2500)
    } else {
      if (onAir) return
      // 경고
      setOnAir(true)
      alert()
      setSubtitle("권한이 없습니다.")
      setTimeout(() => {
        findkey()
        setSubtitle("조종실 도어락을 열기 위한 열쇠를 찾으세요.")
      }, 2000)
      setTimeout(() => {
        setOnAir(false)
        setSubtitle(null)
      }, 5000)
    }
  }

  return isLoaded ? (
    <>
      <primitive
        object={scene}
        ref={doorRef}
        scale={22}
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
      <CockpitDoorBox
        sequences={sequences}
        position={position}
        args={[2, 20, 10]}
        color={"red"}
      />
    </>
  ) : null
}

export default Door3
