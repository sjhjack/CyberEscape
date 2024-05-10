// pubSubscribe.ts
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

// STOMP 클라이언트 생성 및 설정
const createStompClient = (url: string): Client => {
  const socket = new SockJS(url)
  const client = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log(str),
  })
  return client
}

// pubSubscribe 함수
const pubSubscribe = async (
  roomUuid: string,
  callback: (data: PubResponseData) => void,
) => {
  const client = createStompClient("https://localhost:8080/ws-stomp") // WebSocket 서버의 URL

  // 구독 시작
  client.onConnect = () => {
    console.log("Connected to STOMP")
    client.subscribe(`/topic/${roomUuid}`, (message) => {
      const data: PubResponseData = JSON.parse(message.body)
      callback(data) // 메시지 데이터를 callback으로 전달
    })
  }

  client.onStompError = (frame) => {
    console.error(`STOMP error: ${frame.body}`)
  }

  // 클라이언트 연결 시작
  client.activate()
}

export default pubSubscribe
