import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import extractSubstring from "@/hooks/extractSubstring"
import { useEffect, useMemo, useState } from "react"
// import useIngameSolvedStore from "@/stores/IngameSolved"

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  fanalty,
  setFanalty,
  setSubtitle,
}: ProblemProps) => {
  const problem = "16+9 = 1, 8+6 = 2, 14+13 = 3, 4+11 = ?"
  const choices = ["1", "3", "5", "7"]
  const [showExtraImage, setShowExtraImage] = useState(false)
  // const { solved, setSolved } = useIngameSolvedStore()

  const horrorImages = [
    "/image/ghost/ghost1.jpg",
    "/image/ghost/ghost2.jpg",
    "/image/ghost/ghost3.jpg",
    "/image/ghost/ghost4.jpg",
  ]

  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * horrorImages.length)
    return horrorImages[randomIndex]
  }, [horrorImages])

  useEffect(() => {
    const showImg = setTimeout(() => {
      // const audio = new Audio("dubbing/space/start/start_5.mp3")
      // audio.play()
      setShowExtraImage(true)
      const hideImg = setTimeout(() => {
        setShowExtraImage(false)
      }, 900)
      return () => clearTimeout(hideImg)
    }, 8000)
    return () => clearTimeout(showImg)
  }, [])

  const handleAnswerCheck = (choice: string) => {
    // 정답이면
    // setSolved(solved + 1)
    // onClose()
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
    // 오답이면
    // alert("오답입니다")
    // + 패널티 추가(시간 깎거나 무서운 연출)
    setFanalty(fanalty + 1)
  }
  return (
    <>
      {showExtraImage && (
        <BlackBackground>
          <HorrorImageBox>
            <Image
              src={randomImage}
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
          width={650}
          height={650}
        />
        <IconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </IconBox>
        <SubContainer>
          <ProblemText>
            {problem.slice(0, problem.lastIndexOf(","))}
          </ProblemText>
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
  right: 138px;
  top: 45px;
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
