import React, { useRef, useMemo, useState, useEffect } from "react"
import { MeshBasicMaterial, BoxGeometry } from "three"
import Video2 from "./Video2"
import { useThree } from "@react-three/fiber"
import SecondToTime from "@/hooks/SecondToTime"
import postUpdateRank from "@/services/main/ranking/postUpdateRank"
import useUserStore from "@/stores/UserStore"

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
  setClearTime,
  timerRef,
  trigger,
  setTrigger,
}: any) => {
  const meshRef = useRef()
  const geometry = useMemo(() => new BoxGeometry(2, 2, 2), [])
  const temp_position = [-108.51, 3.5, -71.95]

  const url1 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/error1.mp4"
  const url2 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/countdown.mp4"
  const url3 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/countdown2.mp4"
  const url4 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/system_operating.mp4"
  const [currentUrl, setCurrentUrl] = useState(url1)
  const { userUuid } = useUserStore()

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
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/cockpit_up.mp3",
    )
    audio.play()

    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
    }, 8000)
  }

  const EscapeSoundEffect = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/cockpit_up.mp3",
    )
    audio.play()
  }

  const tryEscape = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/try_escape.mp3",
    )
    audio.play()
  }

  const errorOccur = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/system_error.mp3",
    )
    audio.play()
  }

  const countDownStart = (num: number) => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        `/dubbing/space/sequence/countdown/${num}.mp3`,
    )
    audio.play()
  }

  const { camera } = useThree()

  const handleClick = () => {
    if (
      sequences[0].done === true &&
      sequences[1].done === false &&
      sequences[5].done === false &&
      !onAir &&
      camera.position.x < -100
    ) {
      const updatedTrigger = [...trigger]
      updatedTrigger[0] = { ...updatedTrigger[0], activate: true }
      setTrigger(updatedTrigger)
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

            const new_audio = new Audio(
              process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/power_down.mp3",
            )
            new_audio.play()
            setTimeout(() => {
              setSubtitle("시스템 오류가 발생했습니다.")
            }, 2000)
            setTimeout(() => {
              setSubtitle("서버실에서 수리가 필요합니다.")
            }, 4000)
            setTimeout(() => {
              const new_audio2 = new Audio(
                process.env.NEXT_PUBLIC_IMAGE_URL +
                  "/dubbing/space/sequence/living_key.mp3",
              )
              new_audio2.play()
              setSubtitle("생활실에서 키 모양의 물체가 감지되었습니다.")
            }, 6000)
            setTimeout(() => {
              setSubtitle(null)
              setOnAir(false)
            }, 8000)
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
      const updatedTrigger = [...trigger]
      updatedTrigger[2] = { ...updatedTrigger[2], activate: true }
      setTrigger(updatedTrigger)
      setOnAir(true)
      tryEscape()
      setSubtitle("비상 탈출을 시도합니다.")
      let currentCountdown = 10
      setTimeout(() => {
        EscapeSoundEffect()
        setCurrentUrl(url3)
      }, 2000)
      setTimeout(() => {
        const countdownInterval = setInterval(async () => {
          if (currentCountdown >= 1) {
            countDownStart(currentCountdown)
            setSubtitle(currentCountdown.toString())
            currentCountdown--
          } else {
            setCurrentUrl(url4)
            setOnAir(false)
            const currentTime = timerRef.current.getTime()
            const clearSeconds =
              600 - (currentTime.minutes * 60 + currentTime.seconds)
            await setClearTime(SecondToTime(clearSeconds))
            await postUpdateRank(
              SecondToTime(clearSeconds),
              userUuid as string,
              7,
            )

            const new_audio = new Audio(
              process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/rocket_launch.mp3",
            )
            new_audio.play()

            setTimeout(() => {
              const new_audio2 = new Audio(
                process.env.NEXT_PUBLIC_IMAGE_URL +
                  "/dubbing/space/sequence/congratulations.mp3",
              )
              new_audio2.play()
            }, 1000)

            setTimeout(() => {
              setIsGameFinished(true)
              setResult("victory")
              setSubtitle(null)
            }, 6000)

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
