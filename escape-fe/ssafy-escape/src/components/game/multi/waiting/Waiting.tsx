"use client"
import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import useOpenViduSession from "@/hooks/OpenviduSession"
import Container from "@/components/common/Container"
import * as S from "../../../../app/@modal/main/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
import InviteModal from "@/components/game/multi/waiting/InviteModal"
import useIngameThemeStore from "@/stores/IngameTheme"
import Button from "@/components/common/Button"

interface ChatType {
  userName: string
  message: string
}
interface userInfo {
  nickname: string
  img: string
}
const Waiting = () => {
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(20)
  const [chatting, setChattting] = useState<Array<ChatType>>([])
  const { session, subscribers, mainStreamManager } = useOpenViduSession(
    roomUuid,
    setChattting,
  )
  const [myInfo, setMyInfo] = useState<userInfo>({ nickname: "", img: "" })
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModalClose = (): void => {
    setShowModal(false)
  }

  const { selectedTheme } = useIngameThemeStore()

  // useEffect(() => {
  //   if (subscribers.length > 0 && mainStreamManager) {
  //     const mainSubscriber = subscribers.find(
  //       (subscriber) =>
  //         subscriber.stream.connection.data ===
  //         mainStreamManager?.stream.connection.data,
  //     )
  //     console.log("탐색중", subscribers[0].stream, mainStreamManager.stream)

  //     if (mainSubscriber) {
  //       const clientData = JSON.parse(mainSubscriber.stream.connection.data)
  //       // 가정: `mainSubscriber` 객체에 nickname과 img 정보가 있다고 가정
  //       setMyInfo({
  //         nickname: clientData.nickname,
  //         img: clientData.img,
  //       })
  //     }
  //   }
  // }, [subscribers, mainStreamManager])
  useEffect(() => {
    console.log("구독자 목록", subscribers)
  }, [subscribers])
  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <InviteModal open={showModal} handleClose={handleModalClose} />
      <S.UserBox style={{ marginRight: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname>{myInfo.nickname}</S.Nickname>
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
