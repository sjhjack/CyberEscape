"use client"
import useOpenViduSession from "@/hooks/OpenviduSession"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import * as StompJs from "@stomp/stompjs"
import SockJS from "sockjs-client"
import useUserStore from "@/stores/UserStore"
import useIngameThemeStore from "@/stores/IngameTheme"
import patchExit from "@/services/game/room/patchExit"
import Waiting from "./Waiting"
import Ingame from "./Ingame"
import Swal from "sweetalert2"
// socket cleint, openvidu session, 게임 입장 및 퇴장 다 여기서 관리
interface chatData {
  userName: string
  message: string
}

const GameRoom = () => {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(20)
  const { selectedTheme } = useIngameThemeStore()
  // openvidu 관련 변수
  const [chatting, setChattting] = useState<Array<chatData>>([])
  const { accessToken, userUuid, isHost } = useUserStore()
  const { joinSession, leaveSession, audioRef, session } = useOpenViduSession(
    roomUuid,
    setChattting,
  )

  // stomp client 관련 변수
  const client = useRef<StompJs.Client | null>(null) // Ref for storing the client object
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isIngame, setisIngame] = useState<boolean>(false)
  const [roomData, setRoomData] = useState<PubResponseData | null>(null)
  const connectHeaders = {
    Authorization: `Bearer ${accessToken || ""}`,
  }
  const onConnected = () => {
    client.current?.subscribe(
      `/topic/${roomUuid}`,
      (payload) => {
        console.log("새로운 정보 넘어옴")
        const roomInfo = JSON.parse(payload.body)
        setRoomData(roomInfo)
      },
      connectHeaders,
    )
    client.current?.publish({
      destination: `/pub/room/connect`,
      headers: {
        userUuid: userUuid || "",
        roomUuid: roomUuid,
        userType: isHost ? "host" : "guest",
      },
    })
  }
  // 입장 시 소켓 연결
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
  // 게임 레디 상태 바뀔 때마다 request 보내기
  const ready = (): void => {
    setIsReady(!isReady)
    client.current?.publish({
      destination: `/pub/room/ready`,
      body: roomUuid,
    })
  }
  const kick = (): void => {
    client.current?.publish({
      destination: `/pub/room/kickGuest`,
      body: roomUuid,
    })
  }
  const gameOut = async () => {
    await patchExit({
      roomUuid: roomUuid,
      userUuid: userUuid || "",
    })
    client.current?.deactivate()
    leaveSession()
  }
  // 게임방 들어오면 stomp client, openvidu 연결 시작. 언마운트 되면 연결 끊기
  useEffect(() => {
    connect()
    joinSession()
    return () => {
      gameOut()
    }
  }, [])
  useEffect(() => {
    // guest와 host 둘 다 준비하면 게임스타트
    if (roomData?.guestReady && roomData?.hostReady) {
      setisIngame(true)
    }
    if (roomData?.kicked && roomData?.guest?.uuid === userUuid) {
      Swal.fire("방장으로부터 강제 퇴장 당했습니다")
      router.push("/main/multi/room")
    }
  }, [roomData])

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} controls></audio>
      {isIngame ? (
        <Ingame />
      ) : (
        <Waiting
          session={session}
          chatting={chatting}
          ready={ready}
          kick={kick}
          roomData={roomData}
          isReady={isReady}
          selectedTheme={selectedTheme || 1}
        />
      )}
    </>
  )
}
export default GameRoom