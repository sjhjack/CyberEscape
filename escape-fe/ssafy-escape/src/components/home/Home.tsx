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
// import useUserStore from "@/stores/UserStore"

interface HomeProps {
  showText?: boolean
}
const Home = ({ showText = true }: HomeProps) => {
  // const { isLogin } = useUserStore()
  const isLogin = false
  const router = useRouter()
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isStartClicked, setIsStartClicked] = useState<boolean>(false)
  const pointerLockControlsRef = useRef<CameraMoveToPositionRef>(null)

  const onMoveClick = () => {
    pointerLockControlsRef.current?.moveToPosition(3, 1, -7)
    if (isLogin) {
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
        <>
          {!isStartClicked && showText ? (
            <>
              <S.TitleText>Cyber Escape</S.TitleText>
              <S.StartButtton onClick={() => onMoveClick()}>
                START
              </S.StartButtton>
            </>
          ) : isStartClicked && showText ? (
            <Login handleLoginback={onBackClick} />
          ) : null}
        </>
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  )
}

export default Home
