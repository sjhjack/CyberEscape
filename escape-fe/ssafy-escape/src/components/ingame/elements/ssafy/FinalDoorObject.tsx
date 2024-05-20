import { Box } from "@react-three/drei"

// 마지막 나갈 수 있는 문
const FinalDoorObject = ({ onClick, setInteractNum }: ClickObjectProps) => {
  return (
    <Box
      position={[37.5, 3, -62.5]}
      rotation={[0, 0, 0]}
      args={[12, 40, 1]}
      onPointerOver={() => setInteractNum(3)}
      onPointerOut={() => setInteractNum(1)}
      onClick={() => onClick()}
    >
      <meshStandardMaterial
        attach="material"
        color="orange"
        transparent={true}
        opacity={0}
      />
    </Box>
  )
}

export default FinalDoorObject
