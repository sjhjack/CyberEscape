import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import extractSubstring from "@/hooks/extractSubstring"
// import useIngameSolvedStore from "@/stores/IngameSolved"

// 두 번째 문제 모달
const SecondProblemModal = ({ onClose }: ProblemProps) => {
  const problem = "16+9 = 1, 8+6 = 2, 14+13 = 3, 4+11 = ?"
  const choices = ["1", "3", "5", "7"]
  // const { solved, setSolved } = useIngameSolvedStore()
  const handleAnswerCheck = (choice: string) => {
    // 정답이면
    // setSolved(solved + 1)
    // onClose()
    // 오답이면
    // alert("오답입니다")
    // + 패널티 추가(시간 깎거나 무서운 연출)
  }
  return (
    <MainContainer>
      <Image src="/image/note.png" alt="노트 이미지" width={550} height={550} />
      <IconBox onClick={onClose}>
        <CloseIcon sx={{ fontSize: 40 }} />
      </IconBox>
      <SubContainer>
        <ProblemText>{problem.slice(0, problem.lastIndexOf(","))}</ProblemText>
        <ProblemText>{extractSubstring(problem)}</ProblemText>
        <ChoiceBox>
          <Button
            theme="fail"
            text={choices[0]}
            width="100px"
            fontSize="22px"
            onClick={() => handleAnswerCheck(choices[0])}
          />
          <Button
            theme="fail"
            text={choices[1]}
            width="100px"
            fontSize="22px"
            onClick={() => handleAnswerCheck(choices[1])}
          />
        </ChoiceBox>
        <ChoiceBox>
          <Button
            theme="fail"
            text={choices[2]}
            width="100px"
            fontSize="22px"
            onClick={() => handleAnswerCheck(choices[2])}
          />
          <Button
            theme="fail"
            text={choices[3]}
            width="100px"
            fontSize="22px"
            onClick={() => handleAnswerCheck(choices[3])}
          />
        </ChoiceBox>
      </SubContainer>
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
`

const SubContainer = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const ProblemText = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  word-break: keep-all;
`

const ChoiceBox = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
`

const IconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 60px;
  top: 92px;
  z-index: 10;
`
