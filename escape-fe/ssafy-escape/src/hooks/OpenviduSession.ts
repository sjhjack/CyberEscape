import { useState, useEffect, useCallback } from "react"
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
  const [OV, setOV] = useState<OpenVidu | undefined>(undefined)
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [subscribers, setSubscribers] = useState<StreamManager[]>([])
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [chatData, setChatData] = useState<ChatData[]>([])
  const { nickname } = useUserStore()

  // 세션 입장
  const joinSession = async () => {
    const token = await getToken(uuid)
    await session?.connect(token, {
      clientData: nickname,
    })
    const newPublisher = await OV?.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: false,
      publishAudio: true,
      publishVideo: false,
    })
    if (newPublisher) {
      session?.publish(newPublisher)
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
    // 세션이 생성되었다면 joinsession 실행
    if (session !== undefined) {
      console.log("세션 설정됨")
      session.on("streamCreated", (event: any) => {
        const subscriber = session.subscribe(event.stream, undefined)
        session.subscribe(event.stream, "audioContainer")
        setSubscribers((prev) => [...prev, subscriber])
      })

      session.on("streamDestroyed", (event: any) => {
        deleteSubscriber(event.stream.streamManager as StreamManager)
      })

      session.on("signal", (event: any) => {
        const userName = JSON.parse(event.from.data).clientData
        const message = event.data
        setChatData((prev) => [...prev, { userName, message }])
      })
      joinSession()
    }
  }, [session])

  useEffect(() => {
    const OV = new OpenVidu()
    setOV(OV)
    const newSession = OV.initSession()
    setSession(newSession)
    return () => {
      session?.disconnect()
      leaveSession()
    }
  }, [])

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

  return { session, subscribers, publisher, chatData }
}

export default useOpenViduSession
