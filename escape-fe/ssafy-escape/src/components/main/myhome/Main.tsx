"use client"

import * as S from "@/app/@modal/main/mainStyle"
import MyProfile from "./MyProfile"
import QuickStart from "./QuickStart"

const Main = () => {
  return (
    <S.MainContainer>
      <MyProfile />
      <S.VerticalLine />
      <QuickStart />
    </S.MainContainer>
  )
}

export default Main
