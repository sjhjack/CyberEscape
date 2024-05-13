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

  const url1 = "video/error1.mp4"
  const url2 = "video/loading.mp4"
  const url3 = "video/system_operating.mp4"
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
      }, 5500)
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
