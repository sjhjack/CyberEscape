import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import postAnswer from "@/services/ingame/postAnswer"
import HintModal from "../common/HintModal"
import { useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import data from "@/data/ingame/horror/HorrorOption.json"

// 두 번째 문제 모달
const SecondProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  progressUpdate,
}: ProblemProps) => {
  const [showExtraImage, setShowExtraImage] = useState(false)
  const [hintModalopen, setHintModalOpen] = useState<boolean>(false)
  const [index, setIndex] = useState(0)
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10)
    setIndex(randomIndex)
  }, [])

  useEffect(() => {
    const playAudio = setTimeout(() => {
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/woman_scream.mp3",
      )
      audio.play()
      const showImg = setTimeout(() => {
        setShowExtraImage(true)
        const hideImg = setTimeout(() => {
          setShowExtraImage(false)
        }, 900)
        return () => clearTimeout(hideImg)
      }, 300)
      return () => clearTimeout(showImg)
    }, 5000)
    return () => clearTimeout(playAudio)
  }, [])

  const { solved, setSolved } = useIngameQuizStore()
  const { data: quizData } = useQuery({
    queryKey: ["quizList", 3],
    queryFn: () => getQuiz(3),
  })

  useEffect(() => {
    setOptionData(data)
  }, [])

  if (!optionData) {
    return
  }

  if (!quizData) {
    return
  }

  // 힌트 볼 때마다 시간 30초 깎는 패널티 적용
  const handleOpenModal = () => {
    setHintModalOpen(true)
    timePenalty()
  }

  const handleCloseModal = () => {
    setHintModalOpen(false)
  }

  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[1].quizUuid, answer)).right) {
      setSolved(solved + 1)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      if (setSubtitle) {
        setSubtitle("...아, 기록하려면 노트도 챙겨야지.")
        setTimeout(() => {
          setSubtitle("책장 어디에 꽂아놨던 것 같은데...")
          setTimeout(() => {
            setSubtitle("")
          }, 10000)
        }, 4000)
      }
    } else {
      alert("오답!")
      timePenalty()
      if (penalty && setPenalty) {
        setPenalty(penalty + 1)
      }
    }
  }

  return (
    <>
      {showExtraImage && (
        <BlackBackground>
          <HorrorImageBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                `/image/ghost/ghost${index}.jpg`
              }
              alt="귀신 이미지"
              layout="fill"
              objectFit="cover"
            />
          </HorrorImageBox>
        </BlackBackground>
      )}

      <MainContainer>
        <div>
          <img
            src={quizData[1].url}
            width={600}
            height={550}
            alt="두번째 문제"
          />
          <CloseIconBox onClick={onClose}>
            <CloseIcon sx={{ fontSize: 40 }} />
          </CloseIconBox>
          <ChoiceBox1>
            <Button
              theme="fail"
              width="100px"
              height="40px"
              opacity="0"
              onClick={() =>
                handleAnswerCheck(
                  optionData["horror2QuizList"][quizData[1].quizUuid][0],
                )
              }
            />
            <Button
              theme="fail"
              width="100px"
              height="40px"
              opacity="0"
              onClick={() =>
                handleAnswerCheck(
                  optionData["horror2QuizList"][quizData[1].quizUuid][1],
                )
              }
            />
          </ChoiceBox1>
          <ChoiceBox2>
            <Button
              theme="fail"
              width="100px"
              height="40px"
              opacity="0"
              onClick={() =>
                handleAnswerCheck(
                  optionData["horror2QuizList"][quizData[1].quizUuid][2],
                )
              }
            />
            <Button
              theme="fail"
              width="100px"
              height="40px"
              opacity="0"
              onClick={() =>
                handleAnswerCheck(
                  optionData["horror2QuizList"][quizData[1].quizUuid][3],
                )
              }
            />
          </ChoiceBox2>
        </div>
        <HintIconBox onClick={handleOpenModal}>
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/hint.png"}
            alt="힌트 아이콘"
            width={35}
            height={35}
          />
          <div>힌트보기</div>
        </HintIconBox>
        <HintModal
          open={hintModalopen}
          onClose={handleCloseModal}
          quizUuid={quizData[0].quizUuid}
        />
      </MainContainer>
    </>
  )
}

export default SecondProblemModal

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 20;
`

const ChoiceBox1 = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, 30%);
  gap: 60px;
  margin-top: 30px;
`

const ChoiceBox2 = styled(ChoiceBox1)`
  top: 53%;
  transform: translate(-40%, 45%);
`

const CloseIconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 110px;
  top: 75px;
  z-index: 10;
`

const HorrorImageBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  z-index: 25;
`

export const BlackBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 24;
`

const HintIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 165px;
  top: 72px;
  z-index: 10;
  font-size: 16px;
`
