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
      console.log(answer)
      if (answer.right) {
        setIsAnswer(true)
        if (onAir) return
        setOnAir(true)
        const new_audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "sound/right.mp3",
        )
        new_audio.play()
        setTimeout(() => {
          setOnAir(false)
        }, 2000)
      } else {
        // 틀리면 시간 차감 로직

        if (onAir) return
        setOnAir(true)

        const new_audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "sound/right.mp3",
        )
        new_audio.play()
        setTimeout(() => {
          const audio = new Audio(
            process.env.NEXT_PUBLIC_IMAGE_URL + "sound/discount.mp3",
          )
          audio.play()
        }, 2000)
      }
      // setIsAnswer(true)
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
      <meshBasicMaterial color={"red"} transparent={false} opacity={1} />
    </mesh>
  )
}

export default AnswerSheet
