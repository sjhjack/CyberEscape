import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import { useEffect, useState } from "react"
import postAnswer from "@/services/ingame/postAnswer"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import HintModal from "../common/HintModal"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import Swal from "sweetalert2"
import data from "@/data/ingame/horror/HorrorOption.json"

// 세 번째 문제 모달
const ThirdProblemModal = ({
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
  const [openHint, setOpenHint] = useState<boolean>(false)
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)

  useEffect(() => {
    setOptionData(data)
  }, [])

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
          }, 1300)
          return () => clearTimeout(hideImg)
        }, 500)
        return () => clearTimeout(showImg)
      }, 5000)
      return () => clearTimeout(playAudio)
    }, [])
    
    const { solved, hint, setSolved, setHint } = useIngameQuizStore()
    
    const { data: quizData } = useQuery({
      queryKey: ["quizList", 2],
      queryFn: () => getQuiz(2),
    })
    
    if (!quizData) {
      return
    }
    
    if (!optionData) {
      return
    }
    // 힌트 볼 때 시간 30초 깎는 패널티 적용
    const handleOpenModal = () => {
      if (hint === 1) {
        setHint(0)
      setOpenHint(true)
      setHintModalOpen(true)
      timePenalty()
    } else if (hint === 0 && openHint) {
      setHintModalOpen(true)
    } else if (hint === 0) {
      Swal.fire({
        title: "힌트를 모두 사용했습니다.",
        width: "500px",
        padding: "40px",
      })
    }
  }

  const handleCloseModal = () => {
    setHintModalOpen(false)
  }

  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[2].quizUuid, answer)).right) {
      if (progressUpdate) {
        progressUpdate()
      }
      setSolved(solved + 1)
      onClose()
      if (setSubtitle) {
        setSubtitle("...그러고 보니 처음부터 문고리가 없었던 것 같은데.")
        setTimeout(() => {
          setSubtitle("마지막 희망이야.")
          setTimeout(() => {
            setSubtitle("문고리...문고리를 찾아야 해.")
            setTimeout(() => {
              setSubtitle("")
            }, 10000)
          }, 4000)
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
            src={quizData[2].url}
            width={620}
            height={580}
            alt="세번째 문제"
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
                  optionData["horror1QuizList"][quizData[2].quizUuid][0],
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
                  optionData["horror1QuizList"][quizData[2].quizUuid][1],
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
                  optionData["horror1QuizList"][quizData[2].quizUuid][2],
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
                  optionData["horror1QuizList"][quizData[2].quizUuid][3],
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
          quizUuid={quizData[2].quizUuid}
        />
      </MainContainer>
    </>
  )
}

export default ThirdProblemModal

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  right: 130px;
  top: 40px;
  z-index: 24;
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

const BlackBackground = styled.div`
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
  top: 42px;
  z-index: 10;
  font-size: 16px;
`
