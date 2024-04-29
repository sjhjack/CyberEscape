"use client"
import React, { useState } from "react"
import * as S from "@/app/(isLogIn)/game/multi/room/roomStyle"
import Image from "next/image"
import RoomPasswordModal from "./RoomPasswordModal"
import { useRouter } from "next/navigation"
const Room = ({ roomData }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleModalClose = (): void => {
    setShowModal(false)
  }
  const router = useRouter()
  const thema = ["공포", "싸피", "우주"]
  const enterRoom = () => {
    if (roomData.hasPassword) {
      setShowModal(true)
    } else {
      router.push(`/game/multi/waiting`)
    }
    // router.push(`/game/multi/waiting/${roomData.uuid}`)
  }
  return (
    <S.RoomBox onClick={enterRoom}>
      <RoomPasswordModal open={showModal} onClose={handleModalClose} />
      <Image
        src={`/image/${thema[roomData.themaId]}.png`}
        alt=""
        width={70}
        height={70}
      />
      <S.Title>{roomData.title}</S.Title>
      <S.Menu>인원: {roomData.capacity}/2</S.Menu>
      <S.Menu>방장: {roomData.nickname}</S.Menu>
      <S.Menu>테마: {thema[roomData.themaId]}</S.Menu>
    </S.RoomBox>
  )
}

export default Room
