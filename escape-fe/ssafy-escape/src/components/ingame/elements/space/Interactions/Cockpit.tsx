import React, { useRef, useMemo, useState, useEffect } from "react"
import { MeshBasicMaterial, BoxGeometry } from "three"
import Video2 from "./Video2"
import { useThree } from "@react-three/fiber"
import TWEEN from "@tweenjs/tween.js"

const Cockpit = ({
  position,
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  const meshRef = useRef()
  const geometry = useMemo(() => new BoxGeometry(2, 2, 2), [])

  const url1 = "video/error1.mp4"
  const url2 = "video/countdown.mp4"
  const url3 = "video/countdown2.mp4"
  const [currentUrl, setCurrentUrl] = useState(url1)

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    [],
  )

  const tryEscape = () => {
    const audio = new Audio("dubbing/space/sequence/try_escape.mp3")
    audio.play()
  }

  const errorOccur = () => {
    const audio = new Audio("dubbing/space/sequence/system_error.mp3")
    audio.play()
  }

  const countDownStart = (num: number) => {
    const audio = new Audio(`dubbing/space/sequence/countdown/${num}.mp3`)
    audio.play()
  }

  // useEffect(() => {
  //   const animate = () => {
  //     requestAnimationFrame(animate)
  //     TWEEN.update() // Update Tween.js animations
  //   }
  //   animate()
  // }, [])

  const { camera } = useThree()
  const initiateSpaceWarp = () => {
    const destination = { x: 0, y: 0, z: 1000 }
    console.log("Initiating space warp to:", destination)

    const duration = 5000

    const tween = new TWEEN.Tween(camera.position)
      .to(destination, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.position.x += 0.1
        camera.position.y += 0.1
        camera.position.z += 0.1
        console.log("Tween update - Camera position:", camera.position)
        // Check if camera position is changing during the animation
      })
      .onComplete(() => {
        console.log("Space warp animation completed!")
      })
      .start()
  }

  const handleClick = () => {
    if (sequences[1].done === false && sequences[3].done === false) {
      tryEscape()
      setSubtitle("비상 탈출을 시도합니다.")
      let currentCountdown = 10
      setTimeout(() => {
        setCurrentUrl(url2)
      }, 2000)
      setTimeout(() => {
        const countdownInterval = setInterval(() => {
          if (currentCountdown >= 4) {
            countDownStart(currentCountdown)
            setSubtitle(currentCountdown.toString())
            currentCountdown--
          } else {
            setCurrentUrl(url1)
            errorOccur()
            setTimeout(() => {
              setSubtitle("시스템 오류가 발생했습니다.")
            }, 2000)
            setTimeout(() => {
              setSubtitle("엔진실에서 수리가 필요합니다.")
            }, 4000)
            setTimeout(() => {
              setSubtitle(null)
            }, 6000)
            const updatedSequence = [...sequences]
            updatedSequence[1] = { ...updatedSequence[1], done: true }
            setSequences(updatedSequence)
            clearInterval(countdownInterval)
          }
        }, 1000)
      }, 1000)
    } else if (sequences[1].done === true && sequences[3].done === true) {
      tryEscape()
      setSubtitle("비상 탈출을 시도합니다.")
      let currentCountdown = 10
      setTimeout(() => {
        setCurrentUrl(url3)
      }, 2000)
      setTimeout(() => {
        const countdownInterval = setInterval(() => {
          if (currentCountdown >= 1) {
            countDownStart(currentCountdown)
            setSubtitle(currentCountdown.toString())
            currentCountdown--
          } else {
            initiateSpaceWarp()
            setSubtitle(null)
            clearInterval(countdownInterval)
          }
        }, 1000)
      }, 1000)
    }
  }

  return (
    <>
      <mesh
        ref={meshRef as any}
        position={position}
        geometry={geometry}
        material={material}
        onClick={handleClick}
        onPointerOver={() => {
          setInteractNum(2)
        }}
        onPointerOut={() => {
          setInteractNum(1)
        }}
      />
      <Video2
        url={currentUrl}
        position={[-128.651, 3.5, 85.6]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 2.7, 3]}
      />
    </>
  )
}

export default Cockpit
