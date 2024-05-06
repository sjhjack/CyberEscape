"use client"
import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import useOpenViduSession from "@/hooks/OpenviduSession"

import Container from "@/components/common/Container"
import * as S from "@/app/(isLogIn)/game/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
interface ChatType {
  userName: string
  message: string
}
const userName: string =
  "참가자" + Math.floor(Math.random() * 100 + 1).toString()
const Waiting = () => {
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(20)
  const [chatting, setChattting] = useState<Array<ChatType>>([])
  const { session, subscribers, publisher } = useOpenViduSession(
    roomUuid,
    setChattting,
  )

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <S.UserBox style={{ marginRight: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname>{userName}</S.Nickname>
      </S.UserBox>
      <S.MainBox>
        <S.MainContentBox>
          <S.ThemeImage
            src="/image/horror.jpg"
            alt=""
            width={400}
            height={220}
            priority
          />
        </S.MainContentBox>
        <ChattingBox session={session} chatData={chatting}></ChattingBox>
      </S.MainBox>
      <S.UserBox style={{ marginLeft: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname></S.Nickname>
      </S.UserBox>
    </Container>
  )
}

export default Waiting
