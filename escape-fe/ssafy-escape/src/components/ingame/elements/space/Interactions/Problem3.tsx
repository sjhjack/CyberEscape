import { useTexture, useVideoTexture } from "@react-three/drei"
import AnswerSheet from "./AnswerSheet"
import { useEffect } from "react"

const Problem3 = ({
  onAir,
  setOnAir,
  url,
  uuid,
  position,
  rotation,
  scale,
  thirdBall,
  setThirdBall,
  setInteractNum,
  setSubtitle,
  sequences,
  setSequences,
  timePenalty,
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
            onAir={onAir}
            setOnAir={setOnAir}
            num={4}
            uuid={uuid}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[-2.9, -1, -0.4005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
            timePenalty={timePenalty}
          />
          <AnswerSheet
            onAir={onAir}
            setOnAir={setOnAir}
            num={3}
            uuid={uuid}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[-0.96, -1, -0.4005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
            timePenalty={timePenalty}
          />
          <AnswerSheet
            onAir={onAir}
            setOnAir={setOnAir}
            num={2}
            uuid={uuid}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[0.96, -1, -0.4005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
            timePenalty={timePenalty}
          />
          <AnswerSheet
            onAir={onAir}
            setOnAir={setOnAir}
            num={1}
            position={position}
            rotation={rotation}
            scale={[3, 3, 3]}
            move={[2.82, -1, -0.4005]}
            setBall={setThirdBall}
            setSubtitle={setSubtitle}
            sequences={sequences}
            setSequences={setSequences}
            setInteractNum={setInteractNum}
            timePenalty={timePenalty}
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
  const url1 = process.env.NEXT_PUBLIC_IMAGE_URL + "/video/system_operating.mp4"
  const texture = useVideoTexture(url1)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

export default Problem3
