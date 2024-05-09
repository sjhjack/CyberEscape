import {
  OpenVidu,
  Session,
  Subscriber,
  Publisher,
  StreamManager,
} from "openvidu-browser"

import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
const APPLICATION_SERVER_URL = "http://localhost:8080/"
axios.defaults.headers.post["Content-Type"] = "application/json"
const Openvidu = ({ connectSession, setMessage, uuid }: any) => {
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [mySessionId, setMySessionId] = useState<string>("A303")
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [OV, setOV] = useState<OpenVidu | null>(null)
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined)
  const [chatData, setChatData] = useState<Array<object>>([])
  const userName: string =
    "참가자" + Math.floor(Math.random() * 100 + 1).toString()

  useEffect(() => {
    setMessage(chatData)
  }, [chatData])
  useEffect(() => {
    // 렌더링과 동시에 joinSession 함수 실행 할 예정
    if (!session) {
      joinSession()
    }
    return () => {
      leaveSession()
    }
  }, [])

  useEffect(() => {
    connectSession(session)
  }, [session])

  const joinSession = async () => {
    const newOV = new OpenVidu()
    setOV(newOV)
    const newSession = newOV.initSession()
    setSession(newSession)
    newSession.on("streamCreated", (event: any) => {
      const subscriber = newSession.subscribe(event.stream, undefined)
      const newSubscribers = subscribers
      newSubscribers.push(subscriber)
      setSubscribers(newSubscribers)
    })

    newSession.on("streamDestroyed", (event: any) => {
      if (mainStreamManager) {
        deleteSubscriber(mainStreamManager)
      }
    })
    // 채팅 데이터 저장하기
    newSession.on("signal", (event: any) => {
      console.log("받음", event.data, 1, JSON.parse(event.from.data).clientData) // Message
      const userName: string = JSON.parse(event.from.data).clientData
      const message: string = event.data
      setChatData((prevChatData) => [
        ...prevChatData,
        { userName: userName, message: message },
      ])
    })

    const token = await getToken()
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
      session.disconnect()
    }
    // 설정 초기화
    setOV(null)
    setSession(undefined)
    setSubscribers([])
    setMySessionId("A303")
    setPublisher(null)
    setMainStreamManager(undefined)
  }
  const deleteSubscriber = (streamManager: StreamManager) => {
    let nowSubscribers = subscribers
    let index = nowSubscribers.indexOf(StreamManager, 0)
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

  return <div></div>
}

export default Openvidu
