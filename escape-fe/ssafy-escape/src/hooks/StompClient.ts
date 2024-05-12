// hooks/useStompClient.ts
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

const useStompClient = (url: string): Client => {
  const socket = new SockJS(url)
  const client = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log(str),
  })

  client.onConnect = () => console.log("Connected to STOMP")
  client.onStompError = (frame) => console.error(`STOMP error: ${frame.body}`)

  return client
}

export default useStompClient
