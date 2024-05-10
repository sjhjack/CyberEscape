import { useTexture } from "@react-three/drei"
import AnswerSheet from "./AnswerSheet"

const Problem1 = ({
  url,
  position,
  rotation,
  scale,
  setInteractNum,
  setSubtitle,
  sequences,
  setSequences,
}: any) => {
  const texture = useTexture(url)
  return (
    <>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[0.5, 1.01]} />
        <ProblemMaterial texture={texture} />
      </mesh>
      <AnswerSheet
        num={1}
        position={position}
        rotation={rotation}
        scale={[0.75, 0.75, 0.75]}
        move={[-0.0005, -0.18, -0.62]}
        setSubtitle={setSubtitle}
        sequences={sequences}
        setSequences={setSequences}
        setInteractNum={setInteractNum}
      />
      <AnswerSheet
        num={2}
        position={position}
        rotation={rotation}
        scale={[0.75, 0.75, 0.75]}
        move={[-0.0005, -0.18, -0.19]}
        setSubtitle={setSubtitle}
        sequences={sequences}
        setSequences={setSequences}
        setInteractNum={setInteractNum}
      />
      <AnswerSheet
        num={3}
        position={position}
        rotation={rotation}
        scale={[0.75, 0.75, 0.75]}
        move={[-0.0005, -0.18, 0.22]}
        setSubtitle={setSubtitle}
        sequences={sequences}
        setSequences={setSequences}
        setInteractNum={setInteractNum}
      />
      <AnswerSheet
        num={4}
        position={position}
        rotation={rotation}
        scale={[0.75, 0.75, 0.75]}
        move={[-0.0005, -0.18, 0.62]}
        setSubtitle={setSubtitle}
        sequences={sequences}
        setSequences={setSequences}
        setInteractNum={setInteractNum}
      />
    </>
  )
}

const ProblemMaterial = ({ texture }: any) => {
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export default Problem1
