"use client"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import * as StompJs from "@stomp/stompjs"
import SockJS from "sockjs-client"
import useOpenViduSession from "@/hooks/OpenviduSession"
import Container from "@/components/common/Container"
import * as S from "../../../../app/@modal/main/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
import InviteModal from "@/components/game/multi/waiting/InviteModal"
import Button from "@/components/common/Button"
import useIngameThemeStore from "@/stores/IngameTheme"
import useUserStore from "@/stores/UserStore"
import { CircularProgress } from "@mui/material"
interface ChatType {
  userName: string
  message: string
}

const Waiting = () => {
  const router = useRouter()
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(20)
  const { accessToken, userUuid, isHost } = useUserStore()
  const { selectedTheme } = useIngameThemeStore()
  const [chatting, setChattting] = useState<Array<ChatType>>([])
  // const { session } = useOpenViduSession(roomUuid, setChattting)
  const session = ""
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModalClose = (): void => {
    setShowModal(false)
  }
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const client = useRef<StompJs.Client | null>(null) // Ref for storing the client object
  const [roomData, setRoomData] = useState<PubResponseData | null>(null)

  const connectHeaders = {
    Authorization: accessToken || "",
  }
  const onConnected = () => {
    client.current?.subscribe(`/topic/${roomUuid}`, (payload) => {
      const roomInfo = JSON.parse(payload.body)
      console.log("구독 정보", roomInfo)
      setRoomData(roomInfo)
    })
    client.current?.publish({
      destination: `/pub/room/connect`,
      headers: {
        userUuid: userUuid || "",
        roomUuid: roomUuid,
        userType: isHost ? "host" : "guest",
      },
    })
    client.current?.publish({
      destination: `/pub/room/kickGuest`,
      body: JSON.stringify({
        roomUuid: roomUuid,
      }),
    })
    client.current?.publish({
      destination: `/pub/room/delegateHost`,
      body: JSON.stringify({
        roomUuid: roomUuid,
      }),
    })
  }
  //function2
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`${baseUrl}/ws-stomp`),
      connectHeaders,
      debug: function (str) {
        console.log(str)
      },
      // reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
      onConnect: () => {
        onConnected()
      },
      onStompError: (frame) => {
        console.log(`Broker reported error: ${frame.headers.message}`)
        console.log(`Additional details: ${frame.body}`)
      },
    })
    client.current.activate()
  }
  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    if (roomData !== null) {
      setIsLoading(false)
    }
    console.log("방 정보", roomData)
  }, [roomData])
  if (isLoading) {
    return (
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="none"
      >
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="none"
    >
      <InviteModal open={showModal} handleClose={handleModalClose} />
      <S.UserBox style={{ marginRight: "20px" }}>
        <S.CharacterBox>
          <S.ProfileImage
            src={roomData?.host.profileUrl}
            alt=""
            width={100}
            height={100}
          />
        </S.CharacterBox>
        <S.Nickname>{roomData?.host.nickname}</S.Nickname>
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
          {roomData?.guest ? (
            <S.ProfileImage
              src={roomData?.guest.profileUrl}
              alt=""
              width={100}
              height={100}
            />
          ) : (
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
          )}
        </S.CharacterBox>
        <S.Nickname>{roomData?.guest?.nickname}</S.Nickname>
      </S.UserBox>
    </Container>
  )
}

export default Waiting
