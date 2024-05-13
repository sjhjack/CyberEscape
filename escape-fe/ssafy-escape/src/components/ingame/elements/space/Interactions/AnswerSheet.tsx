import { Vector3 } from "three"

const AnswerSheet = ({
  num,
  position,
  rotation,
  scale,
  move,
  setBall,
  setInteractNum,
}: any) => {
  let new_position = new Vector3()

  new_position.x = position[0] + move[0]
  new_position.y = position[1] + move[1]
  new_position.z = position[2] + move[2]

  const handleClick = () => {
    // 조건 달기
    setBall(true)
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
      <meshBasicMaterial color={"red"} transparent={false} opacity={1} />
    </mesh>
  )
}

export default AnswerSheet
