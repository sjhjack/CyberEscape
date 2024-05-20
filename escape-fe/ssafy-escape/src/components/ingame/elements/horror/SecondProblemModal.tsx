import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import postAnswer from "@/services/ingame/postAnswer"
import HintModal from "../common/HintModal"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import Swal from "sweetalert2"
import data from "@/data/ingame/horror/HorrorOption.json"

// 두 번째 문제 모달
const SecondProblemModal = ({
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
  const { data: quizData } = useQuery({
    queryKey: ["quizList", 2],
    queryFn: () => getQuiz(2),
  })
  useEffect(() => {
    setOptionData(data)
  }, [])

  if (!optionData) {
    return
  }

  if (!quizData) {
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

  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[1].quizUuid, answer)).right) {
      setSolved(solved + 1)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      if (setSubtitle) {
        setSubtitle("...정신이 이상해지는 것 같아.")
        setTimeout(() => {
          setSubtitle("혹시 책들 중에 단서가 있지 않을까?")
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
    <MainContainer>
      <div>
        <img src={quizData[1].url} width={550} height={550} alt="두번째 문제" />
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
                optionData["horror1QuizList"][quizData[1].quizUuid][0],
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
                optionData["horror1QuizList"][quizData[1].quizUuid][1],
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
                optionData["horror1QuizList"][quizData[1].quizUuid][2],
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
                optionData["horror1QuizList"][quizData[1].quizUuid][3],
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
        quizUuid={quizData[1].quizUuid}
      />
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
  right: 60px;
  top: 92px;
  z-index: 10;
`

const HintIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 60px;
  top: 90px;
  z-index: 10;
  font-size: 16px;
`
