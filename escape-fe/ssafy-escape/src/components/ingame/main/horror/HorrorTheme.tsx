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
import useIngameSolvedStore from "@/stores/IngameQuizStore"
import SecondProblemObject from "../../elements/horror/SecondProblemObject"
import SecondProblemModal from "../../elements/horror/SecondProblemModal"
import ThirdProblemModal from "../../elements/horror/ThirdProblemModal"
import ThirdProblemObject from "../../elements/horror/ThirdProblemObject"
import Knob from "../../elements/horror/Knob"
import KnobObject from "../../elements/horror/KnobObject"
import Start from "../../elements/horror/Start"
import Subtitle from "../../elements/common/Subtitle"
import PlaySound from "../../elements/horror/PlaySound"
import { useQuery } from "@tanstack/react-query"
import useIngameThemeStore from "@/stores/IngameTheme"
import getQuiz from "@/services/ingame/getQuiz"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"

// const startPosition = { x: 8, y: 8, z: -2 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [isFlowerClicked, setIsFlowerClicked] = useState<boolean>(false)
  const [isKnobClicked, setIsKnobClicked] = useState<boolean>(false)
  const [twoMinLater, setTwoMinLater] = useState<boolean>(false)
  const [fiveMinLater, setFiveMinLater] = useState<boolean>(false)
  const [penalty, setPenalty] = useState<number>(0)
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)
  const { solved } = useIngameSolvedStore()
  const { selectedTheme } = useIngameThemeStore()
  const [subtitle, setSubtitle] = useState<string>("")
  const [soundNum, setSoundNum] = useState<number>(0)
  const setQuizData = useIngameQuizStore((state) => state.setQuizData)

  const { data: quizData } = useQuery({
    queryKey: ["quizList"],
    queryFn: () =>
      selectedTheme !== null
        ? getQuiz(selectedTheme)
        : Promise.reject(new Error("selectedTheme is null")),
  })
  const timerRef = useRef<CountdownTimerHandle | null>(null)

  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  // 가져온 퀴즈 데이터를 스토어에 저장
  useEffect(() => {
    if (quizData) {
      setQuizData(quizData)
    }
  }, [quizData, setQuizData])

  useEffect(() => {
    // 2분 경과 시
    const twoMintimer = setTimeout(() => {
      setPenalty(penalty + 1)
      setTwoMinLater(true)
    }, 60000 * 2)

    // 5분 경과 시
    const fiveMintimer = setTimeout(() => {
      setSoundNum(2)
      setFiveMinLater(true)
    }, 60000 * 5)

    return () => {
      clearTimeout(twoMintimer), clearTimeout(fiveMintimer)
    }
  }, [])

  // 침대 위 꽃 클릭 시 이벤트
  const handleFlowerClick = () => {
    setIsFlowerClicked(true)
  }

  // 숨겨진 문고리 찾아서 클릭 시 이벤트
  const handleKnobClick = () => {
    setIsKnobClicked(true)
    setSubtitle("얼른, 얼른 밖으로 나가야 해.")
    setTimeout(() => {
      setSubtitle("제발 열려라, 제발...")
      setTimeout(() => {
        setSubtitle("")
      }, 4000)
    }, 4000)
  }

  // 문고리 클릭 시 이벤트
  const handleFinal = () => {
    // 탈출 성공 로직
    alert("탈출성공")
  }

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
          <CountdownTimer ref={timerRef} />
          <Start setSubtitle={setSubtitle} />
        </>
      ) : null}
      <Subtitle text={subtitle} />
      {showFirstProblem ? (
        <FirstProblemModal
          onClose={handleFirstProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {showSecondProblem ? (
        <SecondProblemModal
          onClose={handleSecondProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      {showThirdProblem ? (
        <ThirdProblemModal
          onClose={handleThirdProblem}
          penalty={penalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
          timePenalty={timePenalty}
        />
      ) : null}
      <PlaySound soundNum={soundNum} penalty={penalty} />
      <BasicScene interactNum={1}>
        <Lights penalty={penalty} solved={solved} />
        <Player position={[3, 50, 0]} speed={100} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <MeshObjects />
        {!isFlowerClicked ? <Flower onClick={handleFlowerClick} /> : null}
        <BloodPool solved={solved} isFlowerClicked={isFlowerClicked} />
        <Skull onClick={handleFirstProblem} />
        <Wall />
        <Art twoMinLater={twoMinLater} />
        <Portrait twoMinLater={twoMinLater} fiveMinLater={fiveMinLater} />
        <HangedDoll />

        <Knob
          onClick={handleKnobClick}
          isFind={isKnobClicked}
          solved={solved}
        />
        <KnobObject
          onClick={handleFinal}
          isFind={isKnobClicked}
          solved={solved}
        />

        <Blood penalty={penalty} />
        <HorrorRoom onLoaded={setIsModelLoaded} />
        <SecondProblemObject onClick={handleSecondProblem} />
        <ThirdProblemObject onClick={handleThirdProblem} />
      </BasicScene>
    </>
  )
}

export default HorrorTheme
