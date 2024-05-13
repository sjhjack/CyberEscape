import { useTexture, useVideoTexture } from "@react-three/drei"
import AnswerSheet from "./AnswerSheet"
import { useEffect } from "react"

const Problem3 = ({
  url,
  position,
  rotation,
  scale,
  thirdBall,
  setThirdBall,
  setInteractNum,
  setSubtitle,
  sequences,
  setSequences,
}: any) => {
  const texture = useTexture(url)

  useEffect(() => {}, [position])
  return (
    <>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[0.5, 1.01]} />
        {sequences[3].done === true && !thirdBall ? (
          <ProblemMaterial texture={texture} />
        ) : (
          <VideoMaterial />
        )}
      </mesh>
      {sequences[3].done === true && !thirdBall ? (
        <>
          <AnswerSheet
            num={1}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[-2.9, -1, -0.2005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
          />
          <AnswerSheet
            num={2}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[-0.96, -1, -0.2005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
          />
          <AnswerSheet
            num={3}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[0.96, -1, -0.2005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
          />
          <AnswerSheet
            num={4}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[2.82, -1, -0.2005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
          />
        </>
      ) : null}
    </>
  )
}

const ProblemMaterial = ({ texture }: any) => {
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

const VideoMaterial = () => {
  const url1 = "/video/system_operating.mp4"
  const texture = useVideoTexture(url1)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export default Problem3
