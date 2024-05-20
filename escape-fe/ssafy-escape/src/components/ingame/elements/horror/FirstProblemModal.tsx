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
import Swal from "sweetalert2"
import data from "@/data/ingame/horror/HorrorOption.json"

// 첫 번째 문제 모달
// 문제 모달 중복 코드 많아서 추후 리팩토링 필요
const FirstProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  progressUpdate,
}: ProblemProps) => {
  const [openHint, setOpenHint] = useState<boolean>(false)
  const [hintModalopen, setHintModalOpen] = useState<boolean>(false)
  const { solved, hint, setSolved, setHint } = useIngameQuizStore()
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)

  useEffect(() => {
    setOptionData(data)
  }, [])

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

  // 힌트 모달 닫기
  const handleCloseModal = () => {
    setHintModalOpen(false)
  }

  // 선지 클릭 시 정답여부 확인
  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[0].quizUuid, answer)).right) {
      setSolved(solved + 1)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      if (setSubtitle) {
        setSubtitle("뭔가 단서가 될 만한 것을 찾아봐야겠어.")
        setTimeout(() => {
          setSubtitle("서랍장을 한번 뒤져볼까?")
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
    <MainContainer id="chat-container">
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
                optionData["horror1QuizList"][quizData[0].quizUuid][0],
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
                optionData["horror1QuizList"][quizData[0].quizUuid][1],
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
                optionData["horror1QuizList"][quizData[0].quizUuid][2],
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
                optionData["horror1QuizList"][quizData[0].quizUuid][3],
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

const HintIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 165px;
  top: 70px;
  z-index: 10;
  font-size: 16px;
`
