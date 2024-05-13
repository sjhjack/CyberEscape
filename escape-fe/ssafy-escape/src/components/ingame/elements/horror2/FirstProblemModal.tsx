import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import extractSubstring from "@/hooks/extractSubstring"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import postAnswer from "@/services/ingame/postAnswer"
import { useState } from "react"
import HintModal from "../common/HintModal"

// 첫 번째 문제 모달
// 문제 모달 중복 코드 많아서 추후 리팩토링 필요
const FirstProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  setShowSpider,
}: ProblemProps) => {
  // 더미 삭제 후 문제 부분 코드 수정 필요
  const problem = "16+9 = 1, 8+6 = 2, 14+13 = 3, 4+11 = ?"
  const choices = ["1", "3", "5", "7"]
  const [hintModalopen, setHintModalOpen] = useState<boolean>(false)
  const { solved, setSolved, quizData } = useIngameQuizStore()

  if (!quizData) {
    return <div>퀴즈 데이터가 없습니다.</div>
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
    if ((await postAnswer(quizData[0].quizUuid, answer)).right) {
      setSolved(solved + 1)
      onClose()
      if (setShowSpider) {
        setShowSpider(true)
      }
      setSubtitle("이제 백업은 됐고...")
      setTimeout(() => {
        setSubtitle(
          "이 근처에 실험에 쓸 약물에 대해 적어놓은 종이가 있었던 것 같은데...버렸나?",
        )
        setTimeout(() => {
          setSubtitle("")
        }, 10000)
      }, 4000)
    } else {
      alert("오답입니다")
      setPenalty(penalty + 1)
    }
  }
  return (
    <MainContainer>
      <Image
        src="/image/monitor.png"
        alt="모니터 이미지"
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
      <HintIconBox onClick={handleOpenModal}>
        <Image
          src={"/image/hint.png"}
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

const SubContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 51%;
  transform: translate(-50%, -68%);
  width: 400px;
  height: 310px;
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
  color: white;
`

const GuideText = styled.div`
  position: fixed;
  bottom: 188px;
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
