import { use, useEffect, useState } from "react"
import Problem1 from "../Interactions/Problem1"
import Problem2 from "../Interactions/Problem2"
import Problem3 from "../Interactions/Problem3"
import RotateBall from "./RotateBall"
import getQuiz from "@/services/ingame/getQuiz"

const Problems = ({
  onAir,
  setOnAir,
  sequences,
  setSequences,
  setInteractNum,
  setSubtitle,
  timePenalty,
}: any) => {
  const defaultURL = process.env.NEXT_PUBLIC_IMAGE_URL + "/image/1.png"
  const [url1, setUrl1] = useState(defaultURL)
  const [url2, setUrl2] = useState(defaultURL)
  const [url3, setUrl3] = useState(defaultURL)
  const [uuid1, setUuid1] = useState("")
  const [uuid2, setUuid2] = useState("")
  const [uuid3, setUuid3] = useState("")
  const [firstBall, setFirstBall] = useState(true)
  const [secondBall, setSecondBall] = useState(true)
  const [thirdBall, setThirdBall] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizs = await getQuiz(7)
        setUrl1(quizs[0].url)
        setUrl2(quizs[1].url)
        setUrl3(quizs[2].url)
        setUuid1(quizs[0].quizUuid)
        setUuid2(quizs[1].quizUuid)
        setUuid3(quizs[2].quizUuid)
      } catch (error) {
        console.error("Error fetching quizs:", error)
      }
    }

    fetchData()
  }, [])

  const system_rollback = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL +
        "/dubbing/space/sequence/system_restart.mp3",
    )
    audio.play()
  }

  useEffect(() => {
    if (sequences[1].done) {
      setFirstBall(false)
      setSecondBall(false)
      setThirdBall(false)
    }
  }, [sequences[1].done])

  useEffect(() => {
    if (sequences[3].done === true && firstBall && secondBall && thirdBall) {
      const updatedSequence = [...sequences]
      updatedSequence[4] = { ...updatedSequence[4], done: true }
      setSequences(updatedSequence)

      system_rollback()
      const new_audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/engine_up.mp3",
      )
      new_audio.play()
      setOnAir(true)
      setInteractNum(1)
      setSubtitle("시스템이 재가동되었습니다. 조종실로 가 탈출을 시도하세요.")
      setTimeout(() => {
        setOnAir(false)
        setSubtitle(null)
      }, 3200)
    }
  }, [firstBall, secondBall, thirdBall])

  return (
    <>
      <Problem1
        onAir={onAir}
        setOnAir={setOnAir}
        url={url1}
        uuid={uuid1}
        position={[48.4, 4.3, -65.5]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[18, 6, 4]}
        firstBall={firstBall}
        setFirstBall={setFirstBall}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
        timePenalty={timePenalty}
      />
      <Problem2
        onAir={onAir}
        setOnAir={setOnAir}
        url={url2}
        uuid={uuid2}
        position={[58.4, 4.5, -56.1]}
        rotation={[-0.1, 0, -0]}
        scale={[18, 5.8, 4]}
        secondBall={secondBall}
        setSecondBall={setSecondBall}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
        timePenalty={timePenalty}
      />
      <Problem3
        onAir={onAir}
        setOnAir={setOnAir}
        url={url3}
        uuid={uuid3}
        position={[58.4, 4.5, -75.1]}
        rotation={[0.1, Math.PI, -0]}
        scale={[18, 5.7, 4]}
        thirdBall={thirdBall}
        setThirdBall={setThirdBall}
        sequences={sequences}
        setSequences={setSequences}
        setSubtitle={setSubtitle}
        setInteractNum={setInteractNum}
        timePenalty={timePenalty}
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
