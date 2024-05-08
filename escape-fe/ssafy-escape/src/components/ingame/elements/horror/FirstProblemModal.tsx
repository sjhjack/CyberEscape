import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import extractSubstring from "@/hooks/extractSubstring"
// import useIngameSolvedStore from "@/stores/IngameSolved"

// 첫 번째 문제 모달
// 문제 모달 중복 코드 많아서 추후 리팩토링 필요
const FirstProblemModal = ({
  onClose,
  fanalty,
  setFanalty,
  setSubtitle,
}: ProblemProps) => {
  const problem = "16+9 = 1, 8+6 = 2, 14+13 = 3, 4+11 = ?"
  const choices = ["1", "3", "5", "7"]
  // const { solved, setSolved } = useIngameSolvedStore()
  const handleAnswerCheck = (choice: string) => {
    // 정답이면
    // setSolved(solved + 1)
    // onClose()
    setSubtitle("뭔가 단서가 될 만한 것을 찾아봐야겠어.")
    setTimeout(() => {
      setSubtitle("서랍장을 한번 뒤져볼까?")
      setTimeout(() => {
        setSubtitle("")
      }, 10000)
    }, 4000)

    // 오답이면
    // alert("오답입니다")
    // + 패널티 추가(시간 깎거나 무서운 연출)
    setFanalty(fanalty + 1)
  }
  return (
    <MainContainer>
      <Image
        src="/image/paper.png"
        alt="쪽지 이미지"
        width={600}
        height={550}
      />
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
      <GuideText>
        ※ ALT 또는 ESC 버튼을 누르면 마우스 커서가 나타납니다.
      </GuideText>
    </MainContainer>
  )
}

export default FirstProblemModal

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

const SubContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 51%;
  transform: translate(-45%, -50%);
  width: 395px;
  height: 440px;
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

const GuideText = styled.div`
  position: fixed;
  bottom: 115px;
  left: 175px;
  font-size: 13px;
`

const ChoiceBox = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
`

const IconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 110px;
  top: 75px;
  z-index: 10;
`
