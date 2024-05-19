import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import postAnswer from "@/services/ingame/postAnswer"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  timePenalty,
  setIsSolvedProblem,
  progressUpdate,
}: SSAFTYProblemProps) => {
  const { data: quizData } = useQuery({
    queryKey: ["quizList", 5],
    queryFn: () => getQuiz(5),
  })

  if (!quizData) {
    return
  }

  // 선지 클릭 시 정답여부 확인
  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[2].quizUuid, answer)).right) {
      setIsSolvedProblem(true)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      // 문제 맞췄을 때 대사 띄워주는게 좋을 듯 합니다
    } else {
      alert("오답!")
      timePenalty()
    }
  }

  return (
    <MainContainer>
      <div>
        <img src={quizData[2].url} width={600} height={550} alt="세번째 문제" />
        <CloseIconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </CloseIconBox>
        <ChoiceBox>
          <Button
            theme="fail"
            width="350px"
            height="30px"
            opacity="0"
            onClick={() => handleAnswerCheck("1")}
          />
          <Button
            theme="fail"
            width="350px"
            height="30px"
            opacity="0"
            onClick={() => handleAnswerCheck("2")}
          />
          <Button
            theme="fail"
            width="350px"
            height="30px"
            opacity="0"
            onClick={() => handleAnswerCheck("3")}
          />
          <Button
            theme="fail"
            width="350px"
            height="30px"
            opacity="0"
            onClick={() => handleAnswerCheck("4")}
          />
        </ChoiceBox>
      </div>
    </MainContainer>
  )
}

export default ThirdProblemModal

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

const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 37%;
  transform: translate(-40%, 10%);
  gap: 15px;
  margin-top: 30px;
`

const CloseIconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 30px;
  top: 30px;
  z-index: 10;
`
