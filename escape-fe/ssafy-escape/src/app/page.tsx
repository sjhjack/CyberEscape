"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Login from "./(isLogOut)/login/page"
import * as S from "./homeStyle"
// import useUserStore from "@/stores/UserStore"

const Home = () => {
  // const { isLogin } = useUserStore()
  const router = useRouter()
  const [isStartClicked, setIsStartClicked] = useState<boolean>(false)
  const onMoveClick = () => {
    // if (isLogin) {
    //   router.push("/main")
    // } else {
    //   // 추후 카메라 이동 들어갈 예정
    setIsStartClicked(true)
    // }
  }

  const onBackClick = () => {
    // 추후 카메라 이동 들어갈 예정(router.back() -> x)
    setIsStartClicked(false)
  }

  return (
    <div>
      {!isStartClicked ? (
        <div>
          <S.TitleText>Cyber Escape</S.TitleText>
          <S.StartButtton onClick={() => onMoveClick()}>START</S.StartButtton>
        </div>
      ) : null}
      {isStartClicked ? (
        <div>
          <Login handleLoginback={onBackClick} />
        </div>
      ) : null}
    </div>
  )
}

export default Home
