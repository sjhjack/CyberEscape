import { useEffect } from "react"
import SockJS from "sockjs-client"
import { Client } from "@stomp/stompjs"

interface Message {
  body: string
}

type MessageHandler = (message: Message) => void

const useSocket = (url: string, topic: string, onMessage: MessageHandler) => {
  useEffect(() => {
    const sock = new SockJS(url)
    const client = new Client({
      webSocketFactory: () => sock,
      debug: () => {}, // 디버그 로그를 비활성화
      onConnect: () => {
        console.log("Connected to WebSocket")
        client.subscribe(topic, (message) => {
          console.log("Received message", message.body)
          onMessage(JSON.parse(message.body))
        })
      },
      onStompError: (frame) => console.error(`STOMP error: ${frame.body}`),
    })

    // WebSocket 서버에 연결
    client.activate()

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      client.deactivate()
    }
  }, [url, topic, onMessage]) // 의존성 배열에 url, topic, onMessage 추가
}

export default useSocket
