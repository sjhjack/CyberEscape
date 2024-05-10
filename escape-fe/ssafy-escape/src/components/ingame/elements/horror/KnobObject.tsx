import { Box } from "@react-three/drei"

// 누르면 탈출 성공하는 마지막 키(문고리 대신하는 오브젝트)
const KnobObject = ({ onClick, isFind, solved, setInteractNum }: ClickObjectProps) => {
  return isFind && solved === 3 ? (
    <Box
      position={[-19.5, 33, -77]}
      args={[6, 6, 1]}
      renderOrder={1}
      onPointerOver={() => setInteractNum(2)}
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
  ) : null
}

export default KnobObject
