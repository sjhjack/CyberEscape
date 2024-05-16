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

const GameRoom = () => {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(10)
  const { selectedTheme, setSelectedTheme } = useIngameThemeStore()
  const [gameStart, setGameStart] = useState<boolean>(false)
  // openvidu 관련 변수
  const [chatting, setChattting] = useState<Array<chatData>>([])
  const { accessToken, userUuid, isHost } = useUserStore()
  const { joinSession, leaveSession, audioRef, session } = useOpenViduSession(
    roomUuid,
    setChattting,
  )
  const sendMessage = (text: string) => {
    session
      ?.signal({
        data: text,
      })
      .then(() => {
        console.log("Message successfully sent")
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }
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
  const initialInfo = (): void => {
    client.current?.publish({
      destination: `/pub/room/connect`,
      headers: {
        userUuid: userUuid || "",
        roomUuid: roomUuid,
        userType: isHost ? "host" : "guest",
      },
    })
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
  const progressUpdate = (): void => {
    client.current?.publish({
      destination: `/pub/game/progress`,
      body: roomUuid,
    })
  }
  const progressReset = (): void => {
    client.current?.publish({
      destination: `/pub/game/init`,
      body: roomUuid,
    })
  }
  const gameOut = async () => {
    // socket 및 openvidu session 연결 끊기
    client.current?.deactivate()
    leaveSession()
    patchExit({
      roomUuid: roomUuid,
      userUuid: userUuid || "",
    })
  }

  // 게임방 들어오면 stomp client, openvidu 연결 시작. 언마운트 되면 연결 끊기
  useEffect(() => {
    connect()
    joinSession()
    setTimeout(() => {
      initialInfo()
    }, 1000)
    return () => {
      gameOut()
    }
  }, [])
  useEffect(() => {
    if (gameStart) {
      const newTheme = isHost ? selectedTheme + 1 : selectedTheme + 2
      if (isHost) {
        setSelectedTheme(newTheme)
      } else {
        setSelectedTheme(newTheme)
      }
      progressReset()
      setisIngame(true)
    }
  }, [gameStart])
  useEffect(() => {
    // guest와 host 둘 다 준비하면 게임스타트
    if (roomData?.guestReady && roomData?.hostReady) {
      setGameStart(true)
    }
    if (roomData?.kicked && roomData?.guest?.uuid === userUuid) {
      Swal.fire("방장으로부터 강제 퇴장 당했습니다")
      window.location.href = "/main"
    }
    if (roomData?.host === null) {
      // 호스트가 나가면 대기방이 저절로 삭제되기 때문에 patchExit 할 필요가 없음. 이 부분 추후 수정 필요
      Swal.fire("호스트가 이탈하여 게임이 종료되었습니다.")
      window.location.href = "/main"
    }
  }, [roomData])

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} controls></audio>
      {isIngame ? (
        <Ingame
          roomData={roomData}
          progressUpdate={progressUpdate}
          sendMessage={sendMessage}
          chatting={chatting}
        />
      ) : (
        <Waiting
          chatting={chatting}
          ready={ready}
          kick={kick}
          sendMessage={sendMessage}
          roomData={roomData}
          isReady={isReady}
        />
      )}
    </>
  )
}
export default GameRoom
