import { Box } from "@react-three/drei"

// 세 번째 문제 오브젝트
const ThirdProblemObject = ({
  onClick,
  setInteractNum,
  isSolvedProblem,
}: ClickObjectProps) => {
  return !isSolvedProblem ? (
    <>
      <Box
        position={[-39.5, 14, -42.5]}
        args={[12, 3, 1]}
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
    </>
  ) : null
}

export default ThirdProblemObject
