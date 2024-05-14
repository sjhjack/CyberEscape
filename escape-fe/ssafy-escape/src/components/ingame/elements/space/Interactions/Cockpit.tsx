import React, { useRef, useMemo, useState, useEffect } from "react"
import { MeshBasicMaterial, BoxGeometry } from "three"
import Video2 from "./Video2"
import { useThree } from "@react-three/fiber"

const Cockpit = ({
  onAir,
  setOnAir,
  position,
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
  setResult,
  setIsGameFinished,
}: any) => {
  const meshRef = useRef()
  const geometry = useMemo(() => new BoxGeometry(2, 2, 2), [])
  const temp_position = [-108.51, 3.5, -71.95]

  const url1 = "video/error1.mp4"
  const url2 = "video/countdown.mp4"
  const url3 = "video/countdown2.mp4"
  const url4 = "video/system_operating.mp4"
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

  const tryEscapeSoundEffect = () => {
    const audio = new Audio("sound/cockpit_up.mp3")
    audio.play()

    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
    }, 8000)
  }

  const EscapeSoundEffect = () => {
    const audio = new Audio("sound/cockpit_up.mp3")
    audio.play()
  }

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

  const { camera } = useThree()

  const handleClick = () => {
    if (
      sequences[0].done === true &&
      sequences[1].done === false &&
      sequences[5].done === false &&
      !onAir &&
      camera.position.x < -90
    ) {
      setOnAir(true)
      tryEscape()
      tryEscapeSoundEffect()
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

            const new_audio = new Audio("sound/power_down.mp3")
            new_audio.play()
            setTimeout(() => {
              setSubtitle("시스템 오류가 발생했습니다.")
            }, 2000)
            setTimeout(() => {
              setSubtitle("엔진실에서 수리가 필요합니다.")
            }, 4000)
            setTimeout(() => {
              setSubtitle(null)
              setOnAir(false)
            }, 6000)
            const updatedSequence = [...sequences]
            updatedSequence[1] = { ...updatedSequence[1], done: true }
            setSequences(updatedSequence)
            clearInterval(countdownInterval)
          }
        }, 1000)
      }, 1000)
    } else if (
      sequences[4].done === true &&
      sequences[5].done === false &&
      !onAir
    ) {
      setOnAir(true)
      tryEscape()
      setSubtitle("비상 탈출을 시도합니다.")
      let currentCountdown = 10
      setTimeout(() => {
        EscapeSoundEffect()
        setCurrentUrl(url3)
      }, 2000)
      setTimeout(() => {
        const countdownInterval = setInterval(() => {
          if (currentCountdown >= 1) {
            countDownStart(currentCountdown)
            setSubtitle(currentCountdown.toString())
            currentCountdown--
          } else {
            setCurrentUrl(url4)
            setOnAir(false)
            setIsGameFinished(true)
            setResult("victory")
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
        position={temp_position}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 2.7, 3]}
      />
    </>
  )
}

export default Cockpit
