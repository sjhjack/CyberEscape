import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror2/MeshObjects"
import Floor from "../../elements/common/Floor"
import Blood from "../../elements/horror/Blood"
import { useEffect, useRef, useState } from "react"
import FirstProblemModal from "../../elements/horror2/FirstProblemModal"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import SecondProblemModal, {
  BlackBackground,
} from "../../elements/horror2/SecondProblemModal"
import ThirdProblemModal from "../../elements/horror2/ThirdProblemModal"
import ThirdProblemObject from "../../elements/horror2/ThirdProblemObject"
import Subtitle from "../../elements/common/Subtitle"
import HorrorRoom2 from "../../elements/horror2/HorrorRoom2"
import { Environment, Lightformer } from "@react-three/drei"
import Paper from "../../elements/horror2/Paper"
import Start from "../../elements/horror2/Start"
import Computer from "../../elements/horror2/Computer"
import CountdownTimer, { CountdownTimerHandle } from "../../CountdownTimer"
import { QueryClient, useQuery } from "@tanstack/react-query"
import useIngameThemeStore from "@/stores/IngameTheme"
import getQuiz from "@/services/ingame/getQuiz"
import ScrunchedPaper from "../../elements/horror2/ScrunchedPaper"
import FinalDoor from "../../elements/horror2/FinalDoor"
import Syringe from "../../elements/horror2/Syringe"
import Hammer from "../../elements/horror2/Hammer"
import Glasses from "../../elements/horror2/Glasses"
import ScissorDoll from "../../elements/horror2/ScissorDoll"
import Spider from "../../elements/horror2/Spider"
import CreepyDoll from "../../elements/horror2/CreepyDoll"
import VoodooDoll from "../../elements/horror2/VoodooDoll"
import BloodText from "../../elements/horror2/BloodText"
import PlaySound from "../../PlaySound"
import Result from "../../elements/common/Result"

// const startPosition = { x: 8, y: 8, z: -2 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme2 = ({
  isGameStart,
  setIsModelLoaded,
  progressUpdate,
}: IngameMainProps) => {
  const [isSyringeClicked, setIsSyringeClicked] = useState<boolean>(false)
  const [isHammerClicked, setIsHammerClicked] = useState<boolean>(false)
  const [twoMinLater, setTwoMinLater] = useState<boolean>(false)
  const [fiveMinLater, setFiveMinLater] = useState<boolean>(false)
  const [penalty, setPenalty] = useState<number>(0)
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)
  const { solved } = useIngameQuizStore()
  const { selectedThemeType } = useIngameThemeStore()
  const [subtitle, setSubtitle] = useState<string>("")
  const [interactNum, setInteractNum] = useState<number>(1)
  const [showSpider, setShowSpider] = useState<boolean>(false)
  const [showBlackOut, setShowBlackOut] = useState<boolean>(false)
  const [showBloodText, setShowBloodText] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false)

  const timerRef = useRef<CountdownTimerHandle | null>(null)

  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }
  const handleTimeOut = () => {
    setIsTimeOut(true)
    setResult("timeOut")
    setIsGameFinished(true)
  }

  const queryClient = new QueryClient()
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["quizList", 3],
      queryFn: () => getQuiz(3),
    })
  }, [])

  useEffect(() => {
    // 2분 경과 시
    const twoMintimer = setTimeout(() => {
      setPenalty(penalty + 1)
      setTwoMinLater(true)
    }, 60000 * 2)

    // 5분 경과 시
    const fiveMintimer = setTimeout(() => {
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/lift_door_bangs.mp3",
      )
      audio.play()
      setFiveMinLater(true)
    }, 60000 * 5)

    return () => {
      clearTimeout(twoMintimer), clearTimeout(fiveMintimer)
    }
  }, [])

  // 패널티 1개 -> 화면 까맣게 됨 / 패널티 2개 -> 빨간 글씨 출력
  useEffect(() => {
    if (penalty === 1) {
      setShowBlackOut(true)
      setTimeout(() => {
        setTimeout(() => {
          setShowBlackOut(false)
        }, 2000)
      }, 2000)
    } else if (penalty === 2) {
      setShowBloodText(true)
      setTimeout(() => {
        setTimeout(() => {
          setShowBloodText(false)
        }, 500)
      }, 500)
    }
  }, [penalty])

  // 시간 경과에 따른 조명 연출
  const getEnvironmentIntensity = (
    twoMinLater: boolean,
    fiveMinLater: boolean,
  ): number => {
    if (twoMinLater && !fiveMinLater) {
      return 0.25
    } else if (fiveMinLater) {
      return 0.2
    } else {
      return 0.35
    }
  }
  const environmentIntensity = getEnvironmentIntensity(
    twoMinLater,
    fiveMinLater,
  )

  // 주사기 클릭 시 이벤트
  const handleSyringeClick = () => {
    if (solved === 3) {
      setIsSyringeClicked(true)
      setInteractNum(1)
    }
  }

  // 망치 클릭 시 이벤트
  const handleHammerClick = () => {
    if (solved === 3) {
      setIsHammerClicked(true)
      setInteractNum(1)
    }
  }

  useEffect(() => {
    // 필요한 물품들을 다 챙겼을 시 이벤트(자막)
    if (isHammerClicked && isSyringeClicked) {
      setSubtitle("이제 필요한 건 다 챙긴 것 같은데.")
      setTimeout(() => {
        setSubtitle("슬슬 나가지 않으면 늦겠어.")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    }
  }, [isHammerClicked, isSyringeClicked])

  // 마지막 문 클릭 시 이벤트
  const handleFinal = async () => {
    if (isHammerClicked && isSyringeClicked) {
      await setResult("victory")
      setIsGameFinished(true)
      if (progressUpdate) {
        progressUpdate()
      }
    }
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
          {!isGameFinished && (
            <CountdownTimer ref={timerRef} onTimeOut={handleTimeOut} />
          )}
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
          setShowSpider={setShowSpider}
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
      {showBloodText ? <BloodText role="scientist" penalty={penalty} /> : null}
      {showBlackOut ? <BlackBackground></BlackBackground> : null}
      {isGameFinished ? (
        <Result
          type={result}
          themeIdx={3}
          selectedThemeType={selectedThemeType}
        />
      ) : null}
      <PlaySound penalty={penalty} role="scientist" />
      <BasicScene interactNum={interactNum} onAir={true}>
        <Player position={[3, 40, 0]} speed={100} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, 0.5, 0]}
        />
        <MeshObjects />
        <Environment
          files="/hdr/concrete_tunnel_02_1k.hdr"
          environmentIntensity={environmentIntensity}
          resolution={90}
        >
          <Lightformer intensity={0.5} scale={1} target={[0, 0, 0]} />
        </Environment>
        <Paper twoMinLater={twoMinLater} />
        <Computer
          onClick={handleFirstProblem}
          solved={solved}
          setInteractNum={setInteractNum}
        />
        <Blood penalty={penalty} role="scientist" />
        <VoodooDoll solved={solved} />
        <CreepyDoll solved={solved} />
        <Spider showSpider={showSpider} />
        <ScissorDoll fiveMinLater={fiveMinLater} />
        <Glasses />
        {!isSyringeClicked ? (
          <Syringe
            onClick={handleSyringeClick}
            setInteractNum={setInteractNum}
            solved={solved}
          />
        ) : null}
        <HorrorRoom2 onLoaded={setIsModelLoaded} />
        {!isHammerClicked ? (
          <Hammer
            onClick={handleHammerClick}
            setInteractNum={setInteractNum}
            solved={solved}
          />
        ) : null}
        <FinalDoor
          onClick={handleFinal}
          setInteractNum={setInteractNum}
          solved={solved}
        />
        <ScrunchedPaper
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

export default HorrorTheme2
