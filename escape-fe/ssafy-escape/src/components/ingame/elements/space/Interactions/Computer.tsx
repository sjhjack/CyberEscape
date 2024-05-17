import React, { useRef, useMemo, useState, useEffect } from "react"
import { MeshBasicMaterial, BoxGeometry } from "three"
import Video2 from "./Video2"

const Computer = ({
  onAir,
  setOnAir,
  position,
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  const meshRef = useRef()
  const geometry = useMemo(() => new BoxGeometry(3, 3, 3), [])
  const temp_position = [-43.45, 4.86, -162.9]

  const url1 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/error1.mp4"
  const url2 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/loading.mp4"
  const url3 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/system_operating.mp4"
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

  const handleClick = () => {
    if (sequences[2].done === true && sequences[3].done === false) {
      const updatedSequence = [...sequences]
      updatedSequence[3] = { ...updatedSequence[3], done: true }
      setSequences(updatedSequence)
      setCurrentUrl(url2)
      setTimeout(() => {
        setCurrentUrl(url3)
        const audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL +
            "/dubbing/space/sequence/server_restore.mp3",
        )
        audio.play()
        const new_audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/server_up.mp3",
        )
        new_audio.play()
        setSubtitle("서버실이 재가동되었습니다.")
      }, 5500)
      setTimeout(() => {
        setSubtitle("하지만 탈출을 위해선 엔진실 수리가 필요합니다.")
      }, 7500)
      setTimeout(() => {
        setSubtitle("지금 바로 엔진실로 가세요.")
      }, 10500)
      setTimeout(() => {
        setSubtitle(null)
      }, 12500)
    } else {
      if (onAir) return
      setOnAir(true)
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL +
          "/dubbing/space/sequence/no_time_to_game.mp3",
      )
      audio.play()
      setSubtitle("게임할 시간이 아닙니다.")
      setTimeout(() => {
        setOnAir(false)
        setSubtitle(null)
      }, 2000)
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
        scale={[5, 1.4, 4]}
      />
    </>
  )
}

export default Computer
