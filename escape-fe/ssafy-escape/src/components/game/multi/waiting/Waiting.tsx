"use client"
import React, { useState, useEffect, useRef } from "react"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import Container from "@/components/common/Container"
import * as S from "../../../../app/(isLogIn)/game/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
import Openvidu from "./Openvidu"

const Waiting = () => {
  const [session, setSession] = useState(null)
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

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      {/* <Openvidu /> */}
      <S.UserBox style={{ marginRight: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname>김싸피</S.Nickname>
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
        <ChattingBox session={session}></ChattingBox>
      </S.MainBox>
      <S.UserBox style={{ marginLeft: "20px" }}>
        <S.CharacterBox></S.CharacterBox>
        <S.Nickname>이싸피</S.Nickname>
      </S.UserBox>
    </Container>
  )
}

export default Waiting

// setup() {
//   const userType = ref('host');
//   const roomUuid = ref('');
//   const userUuid = ref('');
//   const webSocket = ref(null);
//   const stompClient = ref(null);
//   const room = ref({
//     host: null,
//     guest: null,
//   });
//   const messages = ref([]);
//   const kickedMessage = ref('d');

//   const isHost = computed(() => userType.value === 'host');

//   const connect = () => {
//     const socket = new WebSocket(`ws://localhost:8080/ws-stomp`);
//     webSocket.value = socket;
//     stompClient.value = Stomp.over(socket);
//     stompClient.value.connect({}, onConnected, onError);
//   };

//   const onConnected = () => {
//     stompClient.value.subscribe(`/topic/${roomUuid.value}`, onRoomInfo);
//     stompClient.value.subscribe('/user/queue/kick', onKicked);
//     stompClient.value.send(
//       '/pub/room.connect',
//       {
//         'userUuid': userUuid.value,
//         'roomUuid': roomUuid.value,
//         'userType': userType.value,
//       }
//     );
//   };

//   const onRoomInfo = (payload) => {
//     const roomInfo = JSON.parse(payload.body);
//     room.value = roomInfo;

//     // 수신한 메시지를 messages 배열에 추가
//     const message = `[${new Date().toLocaleTimeString()}] ${JSON.stringify(roomInfo)}`;
//     messages.value.push(message);
//   };

//   // 수신한 메시지를 kickedMessage에 저장
//   const onKicked = (payload) => {
//     kickedMessage.value = payload.body;
//   };

//   const onError = (error) => {
//     console.error(error);
//   };

//   const kickGuest = () => {
//     stompClient.value.send('/pub/room.kickGuest', {}, roomUuid.value);
//   };

//   const delegateHost = () => {
//     stompClient.value.send('/pub/room.delegateHost', {}, roomUuid.value);
//   };

//   return {
//     userType,
//     roomUuid,
//     userUuid,
//     room,
//     isHost,
//     messages,
//     kickedMessage,
//     connect,
//     kickGuest,
//     delegateHost,
//   };
// },
// };
