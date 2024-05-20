"use client"
import { useRef, useState } from "react"
import * as S from "../../app/homeStyle"
import Login from "../login/Login"
import { Canvas } from "@react-three/fiber"
import HomeRoom from "./HomeRoom"
import { useRouter } from "next/navigation"
import CameraMoveToPosition, {
  CameraMoveToPositionRef,
} from "./CameraMoveToPosition"
import HeaderNav from "../common/HeaderNav"
import { Paytone_One } from "next/font/google"
import useUserStore from "@/stores/UserStore"

interface HomeProps {
  showText?: boolean
}

const paytoneOne = Paytone_One({
  subsets: ["latin"],
  weight: "400",
})

const Home = ({ showText = true }: HomeProps) => {
  const router = useRouter()
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isStartClicked, setIsStartClicked] = useState<boolean>(false)
  const pointerLockControlsRef = useRef<CameraMoveToPositionRef>(null)
  const { isLogin } = useUserStore()

  const onMoveClick = () => {
    pointerLockControlsRef.current?.moveToPosition(3, 1, -7)
    const accessToken = sessionStorage.getItem("access_token")
    if (accessToken && isLogin) {
      router.push("/main")
    } else {
      setIsStartClicked(true)
    }
  }

  const onBackClick = () => {
    pointerLockControlsRef.current?.moveToPosition(4, 3, -2)
    setIsStartClicked(false)
  }

  return (
    <div>
      <Canvas
        shadows
        style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
          castShadow
          receiveShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <HomeRoom onLoaded={setIsModelLoaded} />
        <CameraMoveToPosition ref={pointerLockControlsRef} />
      </Canvas>
      {!showText ? <HeaderNav /> : null}
      {isModelLoaded ? (
        <div>
          {!isStartClicked && showText ? (
            <>
              <S.TitleText className={paytoneOne.className}>
                Cyber Escape
              </S.TitleText>
              <S.StartButtton
                className={paytoneOne.className}
                onClick={() => onMoveClick()}
              >
                START
              </S.StartButtton>
            </>
          ) : isStartClicked && showText ? (
            <Login handleLoginback={onBackClick} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Home
