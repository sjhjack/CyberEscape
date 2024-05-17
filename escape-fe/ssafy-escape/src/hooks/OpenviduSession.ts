// // hooks/useOpenViduSession.ts
// import { OpenVidu } from "openvidu-browser"
// import useOpenViduStore from "@/stores/OpenviduSessionStore"
// import postInitSession from "@/services/game/vociechat/postInitSession"
// import postConnection from "@/services/game/vociechat/postConnection"
// import useUserStore from "@/stores/UserStore"

// const useOpenViduSession = (uuid: string) => {
//   const {
//     session,
//     setSession,
//     clearSession,
//     setPublisher,
//     addSubscriber,
//     removeSubscriber,
//     addChatData,
//   } = useOpenViduStore()
//   const { nickname } = useUserStore()

//   const getToken = async (uuid: string): Promise<string> => {
//     const sessionId = await createSession(uuid)
//     return createToken(sessionId)
//   }

//   const createSession = async (uuid: string): Promise<string> => {
//     try {
//       const response = await postInitSession({ roomUuid: uuid })
//       return response.data.sessionId
//     } catch (error) {
//       console.error("Error creating session:", error)
//       throw error // 또는 기본값 반환 또는 상태 업데이트
//     }
//   }
//   const createToken = async (sessionId: string): Promise<string> => {
//     const response = await postConnection({ sessionId: sessionId })
//     return response.data.voiceChatToken
//   }

//   const voiceConnect = async () => {
//     const newOV = new OpenVidu()
//     const token = await getToken(uuid) // Token fetching logic
//     const newSession = newOV.initSession()
//     newSession
//       .connect(token, { clientData: nickname })
//       .then(() => {
//         const newPublisher = newOV.initPublisher(undefined, {
//           audioSource: undefined, // 오디오 소스
//           videoSource: false, // 비디오는 사용하지 않음
//           publishAudio: true, // 오디오 발행
//           publishVideo: false, // 비디오 발행하지 않음
//         })
//         newSession.on("streamCreated", (event: any) => {
//           console.log("event.stream", event.stream)
//           const subscriber = newSession?.subscribe(event.stream, undefined)
//           addSubscriber(subscriber)
//         })

//         newSession.on("streamDestroyed", (event: any) => {
//           removeSubscriber(event.stream.streamManager)
//         })

//         newSession.on("signal", (event: any) => {
//           const userName = JSON.parse(event.from.data).clientData
//           const message = event.data
//           addChatData({ userName, message })
//         })
//         newSession.publish(newPublisher)
//         setSession(newSession)
//         setPublisher(newPublisher)
//       })
//       .catch((error) => console.error("Connection failed", error))
//   }

//   const voiceDisconnect = () => {
//     if (session) {
//       session.disconnect()
//       clearSession()
//     }
//   }
//   return { voiceConnect, voiceDisconnect }
// }
// export default useOpenViduSession
"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { OpenVidu, Session, StreamManager, Publisher } from "openvidu-browser"
import postInitSession from "@/services/game/vociechat/postInitSession"
import postConnection from "@/services/game/vociechat/postConnection"
import useUserStore from "@/stores/UserStore"
interface ChatData {
  userName: string
  message: string
}

const useOpenViduSession = (
  uuid: string,
  setMessage: (data: ChatData[]) => void,
) => {
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [subscribers, setSubscribers] = useState<StreamManager[]>([])
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [chatData, setChatData] = useState<ChatData[]>([])
  const { nickname } = useUserStore()
  const audioRef = useRef(null)
  // 세션 입장
  const joinSession = async () => {
    const OV = new OpenVidu()
    const newSession = OV.initSession()
    setSession(newSession)
    const token = await getToken(uuid)
    await newSession?.connect(token, {
      clientData: nickname,
    })
    newSession.on("streamCreated", (event: any) => {
      if (audioRef.current) {
        const subscriber = newSession.subscribe(event.stream, audioRef.current)
        setSubscribers((prev) => [...prev, subscriber])
      }
    })

    newSession.on("streamDestroyed", (event: any) => {
      deleteSubscriber(event.stream.streamManager as StreamManager)
    })

    newSession.on("signal", (event: any) => {
      const userName = JSON.parse(event.from.data).clientData
      const message = event.data
      setChatData((prev) => [...prev, { userName, message }])
    })
    const newPublisher = await OV?.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: false,
      publishAudio: true,
      publishVideo: false,
    })
    if (newPublisher) {
      newSession.publish(newPublisher)
      setPublisher(newPublisher)
    }
  }
  // 세션 떠나기
  const leaveSession = () => {
    // Publisher 스트림 중단
    if (publisher) {
      // 스트림의 오디오 및 비디오 트랙을 중단
      const stream = publisher.stream.getMediaStream()
      stream.getAudioTracks().forEach((track) => track.stop())

      // OpenVidu 세션에서 발행 중단
      session?.unpublish(publisher)
    }

    // 세션 연결 해제
    if (session) {
      session.disconnect()
    }

    // 상태 리셋, 리디렉션 등
    setSession(undefined)
    setSubscribers([])
    setPublisher(null)
  }

  useEffect(() => {
    setMessage(chatData)
  }, [chatData, setMessage])

  const deleteSubscriber = useCallback((streamManager: StreamManager) => {
    setSubscribers((prev) => prev.filter((s) => s !== streamManager))
  }, [])

  const getToken = async (uuid: string): Promise<string> => {
    const sessionId = await createSession(uuid)
    return createToken(sessionId)
  }

  const createSession = async (uuid: string): Promise<string> => {
    try {
      const response = await postInitSession({ roomUuid: uuid })
      return response.data.sessionId
    } catch (error) {
      console.error("Error creating session:", error)
      throw error // 또는 기본값 반환 또는 상태 업데이트
    }
  }

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await postConnection({ sessionId: sessionId })
    return response.data.voiceChatToken
  }

  return {
    joinSession,
    leaveSession,
    session,
    subscribers,
    publisher,
    chatData,
    audioRef,
  }
}

export default useOpenViduSession
