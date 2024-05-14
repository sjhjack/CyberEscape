import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import postAnswer from "@/services/ingame/postAnswer"
import HintModal from "../common/HintModal"
import { useState } from "react"

// 첫 번째 문제 모달
// 문제 모달 중복 코드 많아서 추후 리팩토링 필요
const FirstProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
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
      setSubtitle("뭔가 단서가 될 만한 것을 찾아봐야겠어.")
      setTimeout(() => {
        setSubtitle("서랍장을 한번 뒤져볼까?")
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
        src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/paper.png"}
        alt="쪽지 이미지"
        width={600}
        height={550}
      />
      <IconBox onClick={onClose}>
        <CloseIcon sx={{ fontSize: 40 }} />
      </IconBox>
      <SubContainer>
        <img src={quizData[0].url} alt="첫번째 문제" />

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
