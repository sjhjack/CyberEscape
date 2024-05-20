"use client"
import useOpenViduSession from "@/hooks/OpenviduSession"
import React, { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import * as StompJs from "@stomp/stompjs"
import SockJS from "sockjs-client"
import useUserStore from "@/stores/UserStore"
import useIngameThemeStore from "@/stores/IngameTheme"
import patchExit from "@/services/game/room/patchExit"
import Waiting from "./Waiting"
import Ingame from "./Ingame"
import Swal from "sweetalert2"
import Countdown from "./CountDown"
// socket cleint, openvidu session, 게임 입장 및 퇴장 다 여기서 관리

const GameRoom = () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(10)
  const { selectedTheme, setRoomUuid, setSelectedThemeType } =
    useIngameThemeStore()
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [gameTheme, setGameTheme] = useState<number>(0)
  const [showCountdown, setShowCountdown] = useState<boolean>(false)

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
    client.current?.publish({
      destination: `/pub/room/ready`,
      body: roomUuid,
    })
  }
  const kick = (): void => {
    Swal.fire({
      title: "정말 퇴장시키겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        client.current?.publish({
          destination: `/pub/room/kickGuest`,
          body: roomUuid,
        })
      }
    })
  }
  const progressUpdate = (): void => {
    console.log("문제 해결")
    client.current?.publish({
      destination: `/pub/game/progress`,
      body: roomUuid,
    })
  }
  const progressReset = (): void => {
    client.current?.publish({
      destination: `/pub/game/end`,
      body: roomUuid,
    })
  }
  const gameOut = (): void => {
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
    setSelectedThemeType("multi")
    connect()
    joinSession()
    setTimeout(() => {
      setRoomUuid(roomUuid)
      initialInfo()
    }, 1000)
    return () => {
      gameOut()
    }
  }, [])
  useEffect(() => {
    // 게임 시작
    if (gameStart) {
      // let randomNum1, randomNum2
      // do {
      //   randomNum1 = Math.floor(Math.random() * 2) + 1
      //   randomNum2 = Math.floor(Math.random() * 2) + 1
      // } while (randomNum1 === randomNum2)
      if (isHost) {
        setGameTheme(selectedTheme + 1)
      } else {
        setGameTheme(selectedTheme + 2)
      }
      setShowCountdown(true)
    }
    // gameStart를 추적하면서 false일 때는 ingame도 false. 처음 렌더링, 게임 끝나고 다시 대기방 돌아올 때
    else {
      setisIngame(false)
    }
  }, [gameStart])
  useEffect(() => {
    // guest와 host 둘 다 준비하면 게임스타트
    if (roomData?.guestReady && roomData?.hostReady) {
      setGameStart(true)
    }
    if (roomData?.kicked && roomData?.guest?.uuid === userUuid) {
      Swal.fire({
        title: "방장으로부터 강제 퇴장 당했습니다.",
        width: "500px",
        padding: "40px",
      })
      setTimeout(() => {
        window.location.href = "/main"
      }, 2000)
    }
    if (roomData?.host === null) {
      // 호스트가 나가면 대기방이 저절로 삭제되기 때문에 patchExit 할 필요가 없음. 이 부분 추후 수정 필요
      Swal.fire({
        title: "호스트가 이탈하여 게임이 종료되었습니다.",
        width: "500px",
        padding: "40px",
      })
      setTimeout(() => {
        window.location.href = "/main"
      }, 2000)
    }

    // 게임 종료 조건
    if (roomData?.hostProgress === 4 || roomData?.guestProgress === 4) {
      // 예시, 인게임 중일 때, 게스트나 호스트 둘 중 한 명이 게임을 끝내면 5초 후에 대기방으로 이동
      if (isIngame) {
        setTimeout(() => {
          setGameStart(false)
        }, 5000)
      }
    }
    if (isIngame && roomData?.guest === null) {
      // 게임 중에 게스트가 이탈하면
      Swal.fire("상대방이 이탈하였습니다. 게임을 종료합니다")
      setTimeout(() => {
        progressReset()
      }, 2000)
      setGameStart(false)
    }
  }, [roomData])

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} controls></audio>
      {showCountdown ? (
        <Countdown
          onCountdownComplete={() => {
            setShowCountdown(false)
            setisIngame(true)
          }}
        />
      ) : null}
      {isIngame ? (
        <Ingame
          roomData={roomData}
          progressUpdate={progressUpdate}
          progressReset={progressReset}
          sendMessage={sendMessage}
          chatting={chatting}
          gameTheme={gameTheme}
        />
      ) : (
        <Waiting
          showCountdown={showCountdown}
          chatting={chatting}
          ready={ready}
          kick={kick}
          sendMessage={sendMessage}
          roomData={roomData}
        />
      )}
    </>
  )
}
export default GameRoom
