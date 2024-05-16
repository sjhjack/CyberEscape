import postAnswer from "@/services/ingame/postAnswer"
import { useEffect, useState } from "react"
import { Vector3 } from "three"

const AnswerSheet = ({
  onAir,
  setOnAir,
  num,
  uuid,
  position,
  rotation,
  scale,
  move,
  setBall,
  setInteractNum,
  timePenalty,
}: any) => {
  const [isAnswer, setIsAnswer] = useState(false)

  useEffect(() => {
    if (isAnswer) {
      setBall(true)
    }
  }, [isAnswer])

  const fetchData = async () => {
    try {
      const answer = await postAnswer(uuid, num)
      if (answer.right === true) {
        setIsAnswer(true)
        if (onAir) return
        setOnAir(true)
        const new_audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL +
            "/dubbing/space/sequence/right.mp3",
        )
        new_audio.play()
        setTimeout(() => {
          setOnAir(false)
        }, 2000)
      } else {
        if (onAir) return
        setOnAir(true)
        // 틀리면 시간 차감 로직
        timePenalty()

        const new_audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL +
            "/dubbing/space/sequence/wrong.mp3",
        )
        new_audio.play()
        setTimeout(() => {
          const audio = new Audio(
            process.env.NEXT_PUBLIC_IMAGE_URL +
              "/dubbing/space/sequence/discount.mp3",
          )
          audio.play()
        }, 1500)
        setTimeout(() => {
          setOnAir(false)
        }, 3500)
      }
    } catch (error) {
      console.error("Error fetching quizs:", error)
    }
  }

  let new_position = new Vector3()

  new_position.x = position[0] + move[0]
  new_position.y = position[1] + move[1] - 1.1
  new_position.z = position[2] + move[2]

  const handleClick = () => {
    // 조건 달기
    fetchData()
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
