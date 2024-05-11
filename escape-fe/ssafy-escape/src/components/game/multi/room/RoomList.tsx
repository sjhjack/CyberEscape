"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import * as S from "@/app/@modal/main/multi/room/roomStyle"
import Image from "next/image"
import RoomPasswordModal from "./RoomPasswordModal"
import useIngameThemeStore from "@/stores/IngameTheme"
import useUserStore from "@/stores/UserStore"
import patchJoin from "@/services/game/room/patchJoin"
const Room = ({ roomData }: any) => {
  const { setIsHost, userUuid } = useUserStore()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { setSelectedTheme } = useIngameThemeStore()
  const router = useRouter()
  const thema = ["", "공포", "싸피", "우주"]
  const handleModalClose = (): void => {
    setShowModal(false)
  }
  const enterRoom = async () => {
    if (roomData.hasPassword) {
      setShowModal(true)
    } else {
      setSelectedTheme(roomData.themaId)
      await patchJoin({
        roomUuid: roomData.uuid,
        userUuid: userUuid || "",
      })
      // 방 목록에서 입장하는 것은 게스트
      setIsHost(false)
      router.push(`/main/multi/waiting/${roomData.uuid}`)
    }
  }
  return (
    <>
      <RoomPasswordModal open={showModal} handleClose={handleModalClose} />
      <S.RoomBox onClick={enterRoom}>
        <Image
          src={`/image/${roomData.themaId}emoticon.png`}
          alt="테마 이모티콘"
          width={70}
          height={70}
        />
        <S.Title>{roomData.title}</S.Title>
        <S.Menu>인원: {roomData.capacity}/2</S.Menu>
        <S.Menu>방장: {roomData.nickname}</S.Menu>
        <S.Menu>테마: {thema[roomData.themaId]}</S.Menu>
      </S.RoomBox>
    </>
  )
}

export default Room
