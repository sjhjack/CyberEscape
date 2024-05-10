"use client"
import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import useOpenViduSession from "@/hooks/OpenviduSession"
import Container from "@/components/common/Container"
import * as S from "../../../../app/@modal/main/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
import InviteModal from "@/components/game/multi/waiting/InviteModal"
import Button from "@/components/common/Button"
import useIngameThemeStore from "@/stores/IngameTheme"
import useUserStore from "@/stores/UserStore"
import pubSubscribe from "@/services/game/room/pubSubscribe"
interface ChatType {
  userName: string
  message: string
}
const Waiting = () => {
  const [roomData, setRoomData] = useState<PubResponseData | null>(null)
  // 콜백 함수 정의: 구독한 메시지의 데이터를 상태로 업데이트
  const handleRoomData = (data: PubResponseData) => {
    setRoomData(data)
    console.log("Room data received:", data)
  }

  useEffect(() => {
    pubSubscribe(roomUuid, handleRoomData)
  }, [])

  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(20)
  const [chatting, setChattting] = useState<Array<ChatType>>([])
  // const { session } = useOpenViduSession(roomUuid, setChattting)
  const session = ""
  const { nickname, profileUrl } = useUserStore()
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModalClose = (): void => {
    setShowModal(false)
  }
  const { selectedTheme } = useIngameThemeStore()

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <InviteModal open={showModal} handleClose={handleModalClose} />
      <S.UserBox style={{ marginRight: "20px" }}>
        <S.CharacterBox>
          <S.ProfileImage
            src={profileUrl ? profileUrl : ""}
            alt=""
            width={100}
            height={100}
          />
        </S.CharacterBox>
        <S.Nickname>{nickname}</S.Nickname>
      </S.UserBox>
      <S.MainBox>
        <S.MainContentBox>
          <S.ThemeImage
            src={`/image/${selectedTheme}.png`}
            alt=""
            width={400}
            height={220}
            priority
          />
        </S.MainContentBox>
        <ChattingBox session={session} chatData={chatting}></ChattingBox>
      </S.MainBox>
      <S.UserBox style={{ marginLeft: "20px" }}>
        <S.CharacterBox>
          <S.CharacterBoxContent>
            <Button
              text="초대하기"
              theme="success"
              width="100px"
              height="40px"
              onClick={() => {
                setShowModal(true)
              }}
            />
          </S.CharacterBoxContent>
        </S.CharacterBox>
        <S.Nickname></S.Nickname>
      </S.UserBox>
    </Container>
  )
}

export default Waiting
