// hooks/useOpenViduSession.ts
import { useCallback, useRef, useEffect } from "react"
import { OpenVidu, Session } from "openvidu-browser"
import useOpenViduStore from "@/stores/OpenviduSessionStore"
import postInitSession from "@/services/game/vociechat/postInitSession"
import postConnection from "@/services/game/vociechat/postConnection"
import useUserStore from "@/stores/UserStore"

const useOpenViduSession = (uuid: string) => {
  const {
    setSession,
    clearSession,
    setPublisher,
    addSubscriber,
    removeSubscriber,
    addChatData,
    setAudioRef,
  } = useOpenViduStore()
  const OV = useRef<OpenVidu>(new OpenVidu()).current
  const { nickname } = useUserStore()
  const session = useRef<Session | null>(null)
  const getToken = async (uuid: string): Promise<string> => {
    const sessionId = await createSession(uuid)
    return createToken(sessionId)
  }
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current)
    }
  }, [audioRef])
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

  const voiceConnect = useCallback(async () => {
    const token = await getToken(uuid) // Token fetching logic
    session.current = OV.initSession()
    session.current
      .connect(token, { clientData: nickname })
      .then(() => {
        const publisher = OV.initPublisher(undefined, {
          audioSource: undefined, // 오디오 소스
          videoSource: false, // 비디오는 사용하지 않음
          publishAudio: true, // 오디오 발행
          publishVideo: false, // 비디오 발행하지 않음
        })
        if (session.current) {
          session.current.on("streamCreated", (event: any) => {
            if (audioRef.current) {
              const subscriber = session.current?.subscribe(
                event.stream,
                audioRef.current,
              )
              if (subscriber) {
                addSubscriber(subscriber)
              }
            }
          })

          session.current.on("streamDestroyed", (event: any) => {
            removeSubscriber(event.stream.streamManager)
          })

          session.current.on("signal", (event: any) => {
            const userName = JSON.parse(event.from.data).clientData
            const message = event.data
            addChatData({ userName, message })
          })
          session.current.publish(publisher)
          setSession(session.current)
          setPublisher(publisher)
        }
      })
      .catch((error) => console.error("Connection failed", error))
  }, [uuid, OV])

  const voiceDisconnect = useCallback(() => {
    if (session.current) {
      session.current.disconnect()
      clearSession()
      session.current = null
    }
  }, [])

  return { voiceConnect, voiceDisconnect }
}
export default useOpenViduSession

// import { useState, useEffect, useCallback, useRef } from "react"
// import { OpenVidu, Session, StreamManager, Publisher } from "openvidu-browser"
// import postInitSession from "@/services/game/vociechat/postInitSession"
// import postConnection from "@/services/game/vociechat/postConnection"
// import useUserStore from "@/stores/UserStore"
// interface ChatData {
//   userName: string
//   message: string
// }

// const useOpenViduSession = (
//   uuid: string,
//   setMessage: (data: ChatData[]) => void,
// ) => {
//   const [OV, setOV] = useState<OpenVidu | undefined>(undefined)
//   const [session, setSession] = useState<Session | undefined>(undefined)
//   const [subscribers, setSubscribers] = useState<StreamManager[]>([])
//   const [publisher, setPublisher] = useState<Publisher | null>(null)
//   const [chatData, setChatData] = useState<ChatData[]>([])
//   const { nickname } = useUserStore()
//   const audioRef = useRef(null)
//   // 세션 입장
//   const joinSession = async () => {
//     const token = await getToken(uuid)
//     await session?.connect(token, {
//       clientData: nickname,
//     })
//     const newPublisher = await OV?.initPublisherAsync(undefined, {
//       audioSource: undefined,
//       videoSource: false,
//       publishAudio: true,
//       publishVideo: false,
//     })
//     if (newPublisher) {
//       session?.publish(newPublisher)
//       setPublisher(newPublisher)
//     }
//   }
//   // 세션 떠나기
//   const leaveSession = () => {
//     // Publisher 스트림 중단
//     if (publisher) {
//       // 스트림의 오디오 및 비디오 트랙을 중단
//       const stream = publisher.stream.getMediaStream()
//       stream.getAudioTracks().forEach((track) => track.stop())

//       // OpenVidu 세션에서 발행 중단
//       session?.unpublish(publisher)
//     }

//     // 세션 연결 해제
//     if (session) {
//       session.disconnect()
//     }

//     // 상태 리셋, 리디렉션 등
//     setSession(undefined)
//     setSubscribers([])
//     setPublisher(null)
//   }
//   useEffect(() => {
//     // 세션이 생성되었다면 joinsession 실행
//     if (session !== undefined) {
//       console.log("세션 설정됨")
//       session.on("streamCreated", (event: any) => {
//         if (audioRef.current) {
//           const subscriber = session.subscribe(event.stream, audioRef.current)
//           setSubscribers((prev) => [...prev, subscriber])
//         }
//       })

//       session.on("streamDestroyed", (event: any) => {
//         deleteSubscriber(event.stream.streamManager as StreamManager)
//       })

//       session.on("signal", (event: any) => {
//         const userName = JSON.parse(event.from.data).clientData
//         const message = event.data
//         setChatData((prev) => [...prev, { userName, message }])
//       })
//       joinSession()
//     }
//   }, [session])

//   useEffect(() => {
//     const OV = new OpenVidu()
//     setOV(OV)
//     const newSession = OV.initSession()
//     setSession(newSession)
//     return () => {
//       session?.disconnect()
//       leaveSession()
//     }
//   }, [])

//   useEffect(() => {
//     setMessage(chatData)
//   }, [chatData, setMessage])

//   const deleteSubscriber = useCallback((streamManager: StreamManager) => {
//     setSubscribers((prev) => prev.filter((s) => s !== streamManager))
//   }, [])

// const getToken = async (uuid: string): Promise<string> => {
//   const sessionId = await createSession(uuid)
//   return createToken(sessionId)
// }

// const createSession = async (uuid: string): Promise<string> => {
//   try {
//     const response = await postInitSession({ roomUuid: uuid })
//     return response.data.sessionId
//   } catch (error) {
//     console.error("Error creating session:", error)
//     throw error // 또는 기본값 반환 또는 상태 업데이트
//   }
// }

// const createToken = async (sessionId: string): Promise<string> => {
//   const response = await postConnection({ sessionId: sessionId })
//   return response.data.voiceChatToken
// }

//   return { session, subscribers, publisher, chatData, audioRef }
// }

// export default useOpenViduSession
