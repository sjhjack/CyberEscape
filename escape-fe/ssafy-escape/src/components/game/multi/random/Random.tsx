"use client"
import React, { useEffect, useState, useRef } from "react"
import Container from "@/components/common/Container"
import * as StompJs from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { CircularProgress } from "@mui/material"
import useUserStore from "@/stores/UserStore"
import { useRouter } from "next/navigation"
import patchJoin from "@/services/game/room/patchJoin"
import Swal from "sweetalert2"

interface ResponseData {
  roomUuid: string
  hostUuid: string
}
const Random = () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const { accessToken, userUuid, setIsHost } = useUserStore()
  const connectHeaders = {
    Authorization: `Bearer ${accessToken || ""}`,
  }
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [matchData, setMatchData] = useState<ResponseData | null>(null)
  const client = useRef<StompJs.Client | null>(null) // Ref for storing the client object
  const onConnected = () => {
    client.current?.subscribe(`/user/queue/match`, (payload) => {
      console.log("매칭 정보")
      const roomInfo = JSON.parse(payload.body)
      setMatchData(roomInfo)
    })
    client.current?.publish({
      destination: `/pub/room/match`,
      body: userUuid || "",
    })
  }
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`${baseUrl}/ws-stomp`),
      connectHeaders,
      debug: function (str) {
        console.log(str)
      },
      // reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("매칭 시작")
        onConnected()
      },
      onStompError: (frame) => {
        console.log(`Broker reported error: ${frame.headers.message}`)
        console.log(`Additional details: ${frame.body}`)
      },
    })
    client.current.activate()
  }
  useEffect(() => {
    connect()
    return () => {
      client.current?.deactivate()
    }
  })
  useEffect(() => {
    const joinRoom = async () => {
      if (matchData?.roomUuid) {
        if (userUuid === matchData.hostUuid) {
          setIsHost(true)
        } else {
          setIsHost(false)
        }
        await patchJoin({
          roomUuid: matchData.roomUuid,
          userUuid: userUuid || "",
          password: "",
        })
        Swal.fire({
          title: "매칭 완료!",
          width: "400px",
          padding: "40px",
        })
        router.push(`/gameroom/${matchData.roomUuid}`)
      }
    }
    joinRoom()
  }, [matchData])

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      backgroundColor="none"
    >
      <h1 style={{ marginBottom: "10%" }}>상대를 매칭 중입니다.</h1>
      <CircularProgress />
    </Container>
  )
}

export default Random
