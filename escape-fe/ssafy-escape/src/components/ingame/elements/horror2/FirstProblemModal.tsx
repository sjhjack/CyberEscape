import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import postAnswer from "@/services/ingame/postAnswer"
import { useEffect, useState } from "react"
import HintModal from "../common/HintModal"
import data from "@/data/ingame/horror/HorrorOption.json"
import getQuiz from "@/services/ingame/getQuiz"
import { useQuery } from "@tanstack/react-query"

// 첫 번째 문제 모달
// 문제 모달 중복 코드 많아서 추후 리팩토링 필요
const FirstProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  setShowSpider,
  progressUpdate,
}: ProblemProps) => {
  const [hintModalopen, setHintModalOpen] = useState<boolean>(false)
  const { solved, setSolved } = useIngameQuizStore()
  const { data: quizData } = useQuery({
    queryKey: ["quizList", 3],
    queryFn: () => getQuiz(3),
  })
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)

  useEffect(() => {
    setOptionData(data)
  }, [])

  // 힌트 사용 시 시간 30초 깎는 패널티 적용
  const handleOpenModal = () => {
    setHintModalOpen(true)
    timePenalty()
  }
  const handleCloseModal = () => {
    setHintModalOpen(false)
  }
  if (!quizData) {
    return
  }
  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[0].quizUuid, answer)).right) {
      setSolved(solved + 1)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      setTimeout(() => {
        if (setShowSpider) {
          setShowSpider(true)
        }
      }, 500)
      if (setSubtitle) {
        setSubtitle("이제 백업은 됐고...")
        setTimeout(() => {
          setSubtitle(
            "이 근처에 실험에 쓸 약물에 대해 적어놓은 메모가 있었던 것 같은데...버렸나?",
          )
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
  if (!optionData) {
    return
  }

  return (
    <MainContainer>
      <div>
        <img src={quizData[0].url} width={600} height={550} alt="첫번째 문제" />
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
                optionData["horror2QuizList"][quizData[0].quizUuid][0],
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
                optionData["horror2QuizList"][quizData[0].quizUuid][1],
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
                optionData["horror2QuizList"][quizData[0].quizUuid][2],
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
                optionData["horror2QuizList"][quizData[0].quizUuid][3],
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
  )
}

export default FirstProblemModal

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 52%;
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
  transform: translate(-40%, 20%);
  gap: 30px;
  margin-top: 30px;
`

const ChoiceBox2 = styled(ChoiceBox1)`
  top: 50%;
  transform: translate(-40%, 45%);
`

const CloseIconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 65px;
  top: 60px;
  z-index: 10;
`

const HintIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 70px;
  top: 63px;
  z-index: 10;
  font-size: 16px;
`
