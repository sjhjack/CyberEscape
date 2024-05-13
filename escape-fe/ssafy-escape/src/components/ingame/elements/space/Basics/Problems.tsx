import { useEffect, useState } from "react"
import Problem1 from "../Interactions/Problem1"
import Problem2 from "../Interactions/Problem2"
import Problem3 from "../Interactions/Problem3"
import RotateBall from "./RotateBall"

const Problems = ({
  sequences,
  setSequences,
  setInteractNum,
  setSubtitle,
}: any) => {
  const url1 = "/image/problem.png"
  const [firstBall, setFirstBall] = useState(true)
  const [secondBall, setSecondBall] = useState(true)
  const [thirdBall, setThirdBall] = useState(true)

  const system_rollback = () => {
    const audio = new Audio("dubbing/space/sequence/system_restart.mp3")
    audio.play()
  }

  useEffect(() => {
    setFirstBall(false)
    setSecondBall(false)
    setThirdBall(false)
  }, [sequences[1].done])

  useEffect(() => {
    if (sequences[3].done === true && firstBall && secondBall && thirdBall) {
      const updatedSequence = [...sequences]
      updatedSequence[4] = { ...updatedSequence[4], done: true }
      setSequences(updatedSequence)

      system_rollback()
      setInteractNum(1)
      setSubtitle("시스템이 재가동되었습니다. 조종실로 가 탈출을 시도하세요.")
      setTimeout(() => {
        setSubtitle(null)
      }, 3200)
    }
  }, [firstBall, secondBall, thirdBall])

  return (
    <>
      <Problem1
        url={url1}
        position={[48.4, 4.3, -65.5]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[18, 6, 4]}
        firstBall={firstBall}
        setFirstBall={setFirstBall}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
      />
      <Problem2
        url={url1}
        position={[58.4, 4.5, -56.1]}
        rotation={[-0.1, 0, -0]}
        scale={[18, 5.8, 4]}
        secondBall={secondBall}
        setSecondBall={setSecondBall}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
      />
      <Problem3
        url={url1}
        position={[58.4, 4.5, -75.1]}
        rotation={[0.1, Math.PI, -0]}
        scale={[18, 5.7, 4]}
        thirdBall={thirdBall}
        setThirdBall={setThirdBall}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
      />
      <RotateBall
        sunPosition={[59, 9, -65]}
        sequences={sequences}
        color={"blue"}
        delay={1000}
        isRotating={firstBall}
      />
      <RotateBall
        sunPosition={[59, 6, -65]}
        sequences={sequences}
        color={"red"}
        delay={0}
        isRotating={secondBall}
      />
      <RotateBall
        sunPosition={[59, 3, -65]}
        sequences={sequences}
        color={"green"}
        delay={2000}
        isRotating={thirdBall}
      />
    </>
  )
}

export default Problems
