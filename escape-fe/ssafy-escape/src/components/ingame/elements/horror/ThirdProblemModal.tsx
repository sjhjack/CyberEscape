import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import { useEffect, useMemo, useState } from "react"
import postAnswer from "@/services/ingame/postAnswer"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import HintModal from "../common/HintModal"

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
}: ProblemProps) => {
  const problem = "16+9 = 1, 8+6 = 2, 14+13 = 3, 4+11 = ?"
  const choices = ["1", "3", "5", "7"]
  const [showExtraImage, setShowExtraImage] = useState(false)
  const [hintModalopen, setHintModalOpen] = useState<boolean>(false)

  const randomIndex = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * 4)
    return randomIndex
  }, [])

  useEffect(() => {
    const playAudio = setTimeout(() => {
      const audio = new Audio("sound/woman_scream.mp3")
      audio.play()
      const showImg = setTimeout(() => {
        setShowExtraImage(true)
        const hideImg = setTimeout(() => {
          setShowExtraImage(false)
        }, 900)
        return () => clearTimeout(hideImg)
      }, 300)
      return () => clearTimeout(showImg)
    }, 8000)
    return () => clearTimeout(playAudio)
  }, [])

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
    if ((await postAnswer(quizData[2].quizUuid, answer)).right) {
      setSolved(solved + 1)
      onClose()
      setSubtitle("...그러고 보니 처음부터 문고리가 없었던 것 같은데.")
      setTimeout(() => {
        setSubtitle("마지막 희망이야.")
        setTimeout(() => {
          setSubtitle("문고리...문고리를 찾아야 해.")
          setTimeout(() => {
            setSubtitle("")
          }, 10000)
        }, 10000)
      }, 4000)
    } else {
      alert("오답입니다")
      setPenalty(penalty + 1)
    }
  }

  return (
    <>
      {showExtraImage && (
        <BlackBackground>
          <HorrorImageBox>
            <Image
              src={`/image/ghost/ghost${randomIndex}.jpg`}
              alt="귀신 이미지"
              layout="fill"
              objectFit="cover"
            />
          </HorrorImageBox>
        </BlackBackground>
      )}
      <MainContainer>
        <Image
          src="/image/diary.png"
          alt="일기장 이미지"
          width={620}
          height={580}
        />
        <IconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </IconBox>
        <SubContainer>
          <ProblemText>
            {problem.slice(0, problem.lastIndexOf(","))}
          </ProblemText>
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
          quizUuid={quizData[2].quizUuid}
        />
      </MainContainer>
    </>
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

const SubContainer = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-45%, -50%);
  width: 380px;
  height: 580px;
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
  right: 130px;
  top: 40px;
  z-index: 24;
`

const HorrorImageBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  z-index: 25;
`

const BlackBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 24;
`

const HintIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: 165px;
  top: 42px;
  z-index: 10;
  font-size: 16px;
`
