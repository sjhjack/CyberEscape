"use client"
import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { OpenVidu, Session, Publisher, StreamManager } from "openvidu-browser"
import axios from "axios"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import Container from "@/components/common/Container"
import * as S from "@/app/(isLogIn)/game/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
// import Openvidu from "./Openvidu"

const APPLICATION_SERVER_URL = "http://localhost:8080/"
const userName: string =
  "참가자" + Math.floor(Math.random() * 100 + 1).toString()
const Waiting = () => {
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [subscribers, setSubscribers] = useState<Array<any>>([])
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [OV, setOV] = useState<OpenVidu | null>(null)
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined)
  const [chatData, setChatData] = useState<Array<object>>([])
  // useEffect(() => {
  //   // WebSocket 서버의 URL
  //   const serverUrl = "ws://localhost:8080/ws-stomp"
  //   const sock = new SockJS(serverUrl)
  //   const client = Stomp.over(sock)

  //   // 디버그 모드를 false로 설정하여 콘솔에 로깅을 하지 않도록 할 수 있습니다.
  //   client.debug = () => {}

  //   const onConnect = () => {
  //     console.log("Connected to WebSocket")

  //     // 예를 들어, 메시지를 받는 구독을 추가
  //     client.subscribe("/topic/messages", (message: any) => {
  //       console.log("Received message", message.body)
  //     })
  //   }

  //   const onError = (error: Error) => {
  //     console.error("Failed to connect to WebSocket", error)
  //   }

  //   // WebSocket 서버에 연결
  //   client.connect({}, onConnect, onError)

  //   // 컴포넌트 언마운트 시 연결 해제
  //   return () => {
  //     client.disconnect(() => {
  //       console.log("Disconnected from WebSocket")
  //     })
  //   }
  // }, [])

  const pathname: string = usePathname()
  const uuid: string = pathname.substring(20)
  useEffect(() => {
    // 렌더링과 동시에 joinSession 함수 실행 할 예정
    if (!session) {
      joinSession()
    }
    const handleBeforeUnload = () => {
      session?.disconnect()
      console.log("세션 종료")
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      session?.disconnect() // 컴포넌트 언마운트 시에도 세션 종료
    }
  }, [])

  // 세션 참여
  const joinSession = async () => {
    const newOV = new OpenVidu()
    setOV(newOV)
    const newSession = newOV.initSession()
    setSession(newSession)
    const token = await getToken()

    newSession.on("streamCreated", (event: any) => {
      const subscriber = newSession.subscribe(event.stream, undefined)
      const newSubscribers = subscribers
      newSubscribers.push(subscriber)
      setSubscribers(newSubscribers)
    })

    newSession.on("streamDestroyed", (event: any) => {
      console.log("스트림 끊김")
      deleteSubscriber(event.stream.streamManager)
    })
    // 채팅 데이터 저장하기
    newSession.on("signal", (event: any) => {
      console.log("받음", event.data, JSON.parse(event.from.data).clientData) // Message
      const userName: string = JSON.parse(event.from.data).clientData
      const message: string = event.data
      setChatData((prevChatData) => [
        ...prevChatData,
        { userName: userName, message: message },
      ])
    })

    newSession
      .connect(token, { clientData: userName })
      .then(async () => {
        const newPublisher = await newOV.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: false,
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        })
        newSession.publish(newPublisher)
        setMainStreamManager(newPublisher)
        setPublisher(newPublisher)
      })
      .catch((error: Error) => {
        console.error(error.message)
      })
  }

  // 세션을 나갈 때 실행
  const leaveSession = () => {
    if (session) {
      console.log("세션을 떠납니다")
      session.disconnect()
      if (mainStreamManager) {
        deleteSubscriber(mainStreamManager)
      }
    }
    // 설정 초기화
    setOV(null)
    setSession(undefined)
    setSubscribers([])
    setPublisher(null)
    setMainStreamManager(undefined)
  }
  const deleteSubscriber = (streamManager: StreamManager) => {
    let nowSubscribers = subscribers
    let index = nowSubscribers.indexOf(streamManager, 0)
    if (index > -1) {
      nowSubscribers.splice(index, 1)
      setSubscribers(nowSubscribers)
    }
  }

  // 우선, 세션을 생성한다. 그 후, 세션 아이디를 토대로 토큰을 생성한다.
  const getToken = async () => {
    const sessionId = await createSession()
    return await createToken(sessionId)
  }
  const createSession = async () => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "voice/session",
      { roomUuid: uuid },
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    console.log("세션 요청을 함", response.data.data.sessionId)
    return response.data.data.sessionId
  }
  const createToken = async (id: string) => {
    const res = await axios.post(
      APPLICATION_SERVER_URL + `voice/connection`,
      { sessionId: id },
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    console.log("토큰 요청을 함", res.data.data.voiceChatToken)
    return res.data.data.voiceChatToken
  }
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
        <ChattingBox session={session} chatData={chatData}></ChattingBox>
      </S.MainBox>
      <S.UserBox style={{ marginLeft: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname></S.Nickname>
      </S.UserBox>
    </Container>
  )
}

export default Waiting
