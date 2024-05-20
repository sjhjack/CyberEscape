import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import { useState, useEffect } from "react"
import postAnswer from "@/services/ingame/postAnswer"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import HintModal from "../common/HintModal"
import data from "@/data/ingame/horror/HorrorOption.json"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  progressUpdate,
}: ProblemProps) => {
  const [hintModalopen, setHintModalOpen] = useState<boolean>(false)
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)

  const { solved, setSolved } = useIngameQuizStore()
  const { data: quizData } = useQuery({
    queryKey: ["quizList", 3],
    queryFn: () => getQuiz(3),
  })

  useEffect(() => {
    setOptionData(data)
  }, [])

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
    if ((await postAnswer(quizData[2].quizUuid, answer)).right) {
      setSolved(solved + 1)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      if (setSubtitle) {
        setSubtitle("이런, 시간이...서둘러 나가야겠군.")
        setTimeout(() => {
          setSubtitle("...아, 제일 중요한 걸 놓고 갈 뻔했네.")
          setTimeout(() => {
            setSubtitle("주사기랑 망치가 어디있지?")
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
  if (!optionData) {
    return
  }
  return (
    <MainContainer>
      <div>
        <img src={quizData[2].url} width={620} height={580} alt="세번째 문제" />
        <CloseIconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 30 }} />
        </CloseIconBox>
        <ChoiceBox1>
          <Button
            theme="fail"
            width="100px"
            height="40px"
            opacity="0"
            onClick={() =>
              handleAnswerCheck(
                optionData["horror2QuizList"][quizData[2].quizUuid][0],
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
                optionData["horror2QuizList"][quizData[2].quizUuid][1],
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
                optionData["horror2QuizList"][quizData[2].quizUuid][2],
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
                optionData["horror2QuizList"][quizData[2].quizUuid][3],
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

const HintIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 165px;
  bottom: 90px;
  z-index: 10;
  font-size: 16px;
`
