import HangedDoll from "@/components/ingame/elements/horror/HangedDoll"
import HorrorRoom from "@/components/ingame/elements/horror/HorrorRoom"
import Lights from "../../elements/horror/Lights"
import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror/MeshObjects"
import Floor from "../../elements/common/Floor"
import Blood from "../../elements/horror/Blood"
import { useEffect, useRef, useState } from "react"
import Skull from "../../elements/horror/Skull"
import Flower from "../../elements/horror/Flower"
import Wall from "../../elements/horror/Wall"
import Portrait from "../../elements/horror/Portrait"
import Art from "../../elements/horror/Art"
import BloodPool from "../../elements/horror/BloodPool"
import FirstProblemModal from "../../elements/horror/FirstProblemModal"
import SecondProblemObject from "../../elements/horror/SecondProblemObject"
import SecondProblemModal from "../../elements/horror/SecondProblemModal"
import ThirdProblemModal from "../../elements/horror/ThirdProblemModal"
import ThirdProblemObject from "../../elements/horror/ThirdProblemObject"
import Knob from "../../elements/horror/Knob"
import Start from "../../elements/horror/Start"
import Subtitle from "../../elements/common/Subtitle"
import PlaySound from "../../PlaySound"
import { QueryClient } from "@tanstack/react-query"
import useIngameThemeStore from "@/stores/IngameTheme"
import getQuiz from "@/services/ingame/getQuiz"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import BloodText from "../../elements/horror2/BloodText"
import Result from "../../elements/common/Result"
import postUpdateRank from "@/services/main/ranking/postUpdateRank"
import useUserStore from "@/stores/UserStore"
import SecondToTime from "@/hooks/SecondToTime"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import styled from "styled-components"
import Image from "next/image"

// const startPosition = { x: 8, y: 8, z: -2 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme = ({
  isGameStart,
  setIsModelLoaded,
  progressUpdate,
  progressReset,
  roomData,
}: IngameMainProps) => {
  const [isFlowerClicked, setIsFlowerClicked] = useState<boolean>(false)
  const [isKnobClicked, setIsKnobClicked] = useState<boolean>(false)
  const [twoMinLater, setTwoMinLater] = useState<boolean>(false)
  const [fiveMinLater, setFiveMinLater] = useState<boolean>(false)
  const [penalty, setPenalty] = useState<number>(0)
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)
  const { selectedThemeType } = useIngameThemeStore()
  const [subtitle, setSubtitle] = useState<string>("")
  const [interactNum, setInteractNum] = useState<number>(1)
  const [showBloodText, setShowBloodText] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [clearTime, setClearTime] = useState<string>("")
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const { userUuid, isHost } = useUserStore()
  const { solved, reset } = useIngameQuizStore()
  const [showExtraImage, setShowExtraImage] = useState(false)
  const [index, setIndex] = useState(0)
  const [showBlackOut, setShowBlackOut] = useState<boolean>(false)
  const [mouseSpeed, setMouseSpeed] = useState(0.5)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10)
    setIndex(randomIndex)
  }, [])

  const timerRef = useRef<CountdownTimerHandle | null>(null)

  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  // 시간 끝났을 시 이벤트 함수
  const handleTimeOut = () => {
    setResult("timeOut")
    setIsGameFinished(true)
  }

  const queryClient = new QueryClient()
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["quizList", 2],
      queryFn: () => getQuiz(2),
    })
  }, [])

  // 패널티 2개 -> 빨간 글씨 출력 / 4개 -> 귀신 등장 / 6개 -> 남자 비명소리
  useEffect(() => {
    if (penalty === 2) {
      setShowBloodText(true)
      setTimeout(() => {
        setTimeout(() => {
          setShowBloodText(false)
        }, 500)
      }, 500)
    } else if (penalty === 4) {
      const playAudio = setTimeout(() => {
        const audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/woman_scream.mp3",
        )
        audio.play()
        const showImg = setTimeout(() => {
          setShowExtraImage(true)
          const hideImg = setTimeout(() => {
            setShowExtraImage(false)
          }, 1300)
          return () => clearTimeout(hideImg)
        }, 500)
        return () => clearTimeout(showImg)
      }, 5000)
      return () => clearTimeout(playAudio)
    } else if (penalty === 6) {
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/man_scream.mp3",
      )
      audio.play()
      setShowBloodText(true)
      setTimeout(() => {
        setTimeout(() => {
          setShowBloodText(false)
        }, 500)
      }, 500)
    }
  }, [penalty])

  useEffect(() => {
    // 2분 경과 시
    const twoMintimer = setTimeout(() => {
      setPenalty(penalty + 1)
      setTwoMinLater(true)
    }, 60000 * 2)

    // 5분 경과 시
    const fiveMintimer = setTimeout(() => {
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/door_bang.mp3",
      )
      audio.play()
      setFiveMinLater(true)
    }, 60000 * 5)

    return () => {
      clearTimeout(twoMintimer), clearTimeout(fiveMintimer)
    }
  }, [])

  // 침대 위 꽃 클릭 시 이벤트
  const handleFlowerClick = () => {
    setIsFlowerClicked(true)
    setInteractNum(1)
  }

  // 숨겨진 문고리 찾아서 클릭 시 이벤트(싱글이면 시간 갱신, 멀티면 승리 로직만)
  const handleKnobClick = async () => {
    if (!isKnobClicked) {
      setIsKnobClicked(true)
      setSubtitle("얼른, 얼른 밖으로 나가야 해.")
      setTimeout(() => {
        setSubtitle("제발 열려라, 제발...")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    } else {
      if (selectedThemeType === "single") {
        if (timerRef.current) {
          const currentTime = timerRef.current.getTime()
          const clearSeconds =
            480 - (currentTime.minutes * 60 + currentTime.seconds)
          setClearTime(SecondToTime(clearSeconds))
          await postUpdateRank(
            SecondToTime(clearSeconds),
            userUuid as string,
            1,
          )
        }
        setResult("victory")
        setIsGameFinished(true)
      }
      if (progressUpdate) {
        progressUpdate()
      }
    }
  }

  useEffect(() => {
    // 둘 중 한 명이 경기를 끝내면
    if (roomData?.guestProgress === 4 || roomData?.hostProgress === 4) {
      // 호스트
      if (isHost) {
        if (roomData?.hostProgress === 4) {
          setResult("victory")
        } else if (roomData?.guestProgress === 4) {
          setResult("defeat")
        }
      }
      // 게스트
      else {
        if (roomData?.guestProgress === 4) {
          setResult("victory")
        } else if (roomData?.hostProgress === 4) {
          setResult("defeat")
        }
      }
      setIsGameFinished(true)
      if (progressReset) {
        progressReset()
      }

      // 게임 종료 후, 5초 뒤 게임 종료 처리 해제
      setTimeout(() => {
        reset()
        setIsGameFinished(false)
      }, 5000)
    }
  }, [roomData])

  // 첫 번째 문제 모달
  const handleFirstProblem = () => {
    if (solved === 0) {
      setShowFirstProblem(!showFirstProblem)
    }
  }

  // 두 번째 문제 모달
  const handleSecondProblem = () => {
    if (solved === 1) {
      setShowSecondProblem(!showSecondProblem)
    }
  }

  // 세 번째 문제 모달
  const handleThirdProblem = () => {
    if (solved === 2) {
      setShowThirdProblem(!showThirdProblem)
    }
  }

  return (
    <>
      {isGameStart ? (
        <>
          {!isGameFinished && (
            <CountdownTimer
              color={"white"}
              ref={timerRef}
              onTimeOut={handleTimeOut}
              minutes={8}
            />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      {showExtraImage && (
        <BlackBackground>
          <HorrorImageBox>
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                `/image/ghost/ghost${index}.jpg`
              }
              alt="귀신 이미지"
              layout="fill"
              objectFit="cover"
            />
          </HorrorImageBox>
        </BlackBackground>
      )}
      {showBlackOut ? <BlackBackground></BlackBackground> : null}
      {showFirstProblem ? (
        <FirstProblemModal
          progressUpdate={progressUpdate}
          onClose={handleFirstProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {showSecondProblem ? (
        <SecondProblemModal
          progressUpdate={progressUpdate}
          onClose={handleSecondProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {showThirdProblem ? (
        <ThirdProblemModal
          progressUpdate={progressUpdate}
          onClose={handleThirdProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={1}
          selectedThemeType={selectedThemeType}
          clearTime={clearTime}
        />
      ) : null}
      <PlaySound penalty={penalty} role="experiment" />
      {showBloodText ? <BloodText role="experiment" penalty={penalty} /> : null}
      <BasicScene
        interactNum={interactNum}
        onAir={true}
        mouseSpeed={mouseSpeed}
      >
        <Lights penalty={penalty} solved={solved} />
        <Player position={[3, 50, 0]} speed={70} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <MeshObjects />
        {!isFlowerClicked ? (
          <Flower onClick={handleFlowerClick} setInteractNum={setInteractNum} />
        ) : null}
        <BloodPool solved={solved} isFlowerClicked={isFlowerClicked} />
        <Skull
          onClick={handleFirstProblem}
          solved={solved}
          setInteractNum={setInteractNum}
        />
        <Wall />
        <Art twoMinLater={twoMinLater} />
        <Portrait twoMinLater={twoMinLater} fiveMinLater={fiveMinLater} />
        <HangedDoll />

        <Knob
          onClick={handleKnobClick}
          isFind={isKnobClicked}
          solved={solved}
          setInteractNum={setInteractNum}
        />
        <Blood penalty={penalty} role="experiment" />
        <HorrorRoom onLoaded={setIsModelLoaded} />
        <SecondProblemObject
          onClick={handleSecondProblem}
          solved={solved}
          setInteractNum={setInteractNum}
        />
        <ThirdProblemObject
          onClick={handleThirdProblem}
          solved={solved}
          setInteractNum={setInteractNum}
        />
      </BasicScene>
    </>
  )
}

export default HorrorTheme

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
