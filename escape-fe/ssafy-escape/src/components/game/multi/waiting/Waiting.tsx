"use client"
import React, { useState, useEffect } from "react"
import Container from "@/components/common/Container"
import * as S from "../../../../app/(isLogIn)/game/multi/waiting/waitingStyle"
import ChattingBox from "@/components/game/multi/waiting/ChattingBox"
import Openvidu from "./Openvidu"

const Waiting = () => {
  const [session, setSession] = useState(null)
  const [userType, setUserType] = useState(null)
  const [roomUuid, setRoomUuid] = useState(null)
  const [userUuid, setUserUuid] = useState(null)
  const [isHost, setIsHost] = useState(false)
  const webSocket = useState(null)
  const stompClient = useState(null)
  const room = useState({
    host: null,
    guest: null,
  })

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
