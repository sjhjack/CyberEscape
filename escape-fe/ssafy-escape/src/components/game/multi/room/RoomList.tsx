"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import * as S from "@/app/@modal/main/multi/room/roomStyle"
import Image from "next/image"
import RoomPasswordModal from "./RoomPasswordModal"
import useIngameThemeStore from "@/stores/IngameTheme"
import useUserStore from "@/stores/UserStore"
import patchJoin from "@/services/game/room/patchJoin"

interface Themes {
  [key: number]: string
}

const Room = ({ roomData }: any) => {
  const { setIsHost, userUuid } = useUserStore()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { setSelectedTheme, setRoomTitle } = useIngameThemeStore()
  const router = useRouter()
  const themes: Themes = {
    1: "공포",
    4: "싸피",
    7: "우주",
  }
  const handleModalClose = (): void => {
    setShowModal(false)
  }
  const enterRoom = async () => {
    setIsHost(false)
    if (roomData.hasPassword) {
      setShowModal(true)
    } else {
      try {
        await patchJoin({
          roomUuid: roomData.uuid,
          userUuid: userUuid || "",
          password: "",
        })
        setSelectedTheme(roomData.category)
        setRoomTitle(roomData.title)
        // 방 목록에서 입장하는 것은 게스트
        router.push(`/gameroom/${roomData.uuid}`)
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <>
      <RoomPasswordModal
        open={showModal}
        handleClose={handleModalClose}
        roomData={roomData}
      />
      <S.RoomBox onClick={enterRoom}>
        <Image
          src={
            process.env.NEXT_PUBLIC_IMAGE_URL +
            `/image/${roomData.category}emoticon.png`
          }
          alt="테마 이모티콘"
          width={70}
          height={70}
        />
        <S.Title>{roomData.title}</S.Title>
        <S.Menu>인원: {roomData.capacity}/2</S.Menu>
        <S.Menu>방장: {roomData.nickname}</S.Menu>
        <S.Menu>테마: {themes[roomData.category]}</S.Menu>
      </S.RoomBox>
    </>
  )
}

export default Room
