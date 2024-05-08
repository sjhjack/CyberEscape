import { Vector3 } from "three"

const AnswerSheet = ({
  num,
  position,
  rotation,
  scale,
  move,
  sequences,
  setSequences,
  setSubtitle,
  setInteractNum,
}: any) => {
  let new_position = new Vector3()

  new_position.x = position[0] + move[0]
  new_position.y = position[1] + move[1]
  new_position.z = position[2] + move[2]

  const system_rollback = () => {
    const audio = new Audio("dubbing/space/sequence/system_restart.mp3")
    audio.play()
  }

  const handleClick = () => {
    system_rollback()
    setSubtitle("시스템이 재가동되었습니다. 조종실로 가 탈출을 시도하세요.")
    setTimeout(() => {
      setSubtitle(null)
    }, 3200)
    const updatedSequence = [...sequences]
    updatedSequence[2] = { ...updatedSequence[2], done: true }
    updatedSequence[3] = { ...updatedSequence[3], done: true }
    setSequences(updatedSequence)
  }

  return (
    <mesh
      position={new_position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => {
        setInteractNum(2)
      }}
      onPointerOut={() => {
        setInteractNum(1)
      }}
    >
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial color={"red"} transparent={true} opacity={0} />
    </mesh>
  )
}

export default AnswerSheet
