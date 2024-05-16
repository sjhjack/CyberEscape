import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import postAnswer from "@/services/ingame/postAnswer"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import useIngameOptionStore from "@/stores/IngameOptionStore"

// 두 번째 문제 모달
const SecondProblemModal = ({ onClose, timePenalty }: ProblemProps) => {
  const { solved, setSolved } = useIngameQuizStore()

  const { data: quizData } = useQuery({
    queryKey: ["quizList", 6],
    queryFn: () => getQuiz(6),
  })

  const { ssafy2QuizList } = useIngameOptionStore()
  const [choices, setChoices] = useState<string[]>([])

  useEffect(() => {
    if (quizData && quizData[1] && ssafy2QuizList[quizData[1].quizUuid]) {
      setChoices(ssafy2QuizList[quizData[1].quizUuid])
    }
  }, [quizData, ssafy2QuizList])

  if (!quizData) {
    return <div>퀴즈 데이터가 없습니다.</div>
  }

  // 선지 클릭 시 정답여부 확인
  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[1].quizUuid, answer)).right) {
      setSolved(solved + 1)
      onClose()
    } else {
      alert("오답입니다.")
      timePenalty()
    }
  }

  return (
    <MainContainer>
      <div>
        <img src={quizData[1].url} width={600} height={550} alt="두번째 문제" />
        <CloseIconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </CloseIconBox>

        <ChoiceBox1>
          <Button
            theme="fail"
            width="100px"
            height="40px"
            opacity="0"
            onClick={() => handleAnswerCheck(choices[0])}
          />
          <Button
            theme="fail"
            width="100px"
            height="40px"
            opacity="0"
            onClick={() => handleAnswerCheck(choices[1])}
          />
        </ChoiceBox1>
        <ChoiceBox2>
          <Button
            theme="fail"
            width="100px"
            height="40px"
            opacity="0"
            onClick={() => handleAnswerCheck(choices[2])}
          />
          <Button
            theme="fail"
            width="100px"
            height="40px"
            opacity="0"
            onClick={() => handleAnswerCheck(choices[3])}
          />
        </ChoiceBox2>
      </div>
    </MainContainer>
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
  right: 110px;
  top: 75px;
  z-index: 10;
`
