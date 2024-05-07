import React, { useRef, useMemo } from "react"
import { MeshBasicMaterial, BoxGeometry } from "three"

const Cockpit = ({ position, sequences, setSequences, setSubtitle }: any) => {
  const meshRef = useRef()

  const geometry = useMemo(() => new BoxGeometry(2, 2, 2), [])

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

  const firstEscape = () => {
    const audio = new Audio("dubbing/space/sequence/try_escape.mp3")
    audio.play()
  }

  const handleClick = () => {
    if (sequences[1].done === false) {
      firstEscape()
      setSubtitle("비상 탈출을 시도합니다.")
      setTimeout(() => {
        setSubtitle("현재 개발된 스토리는 여기까지입니다.")
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
      />
    </>
  )
}

export default Cockpit
