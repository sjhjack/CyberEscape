"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MainModal from "@/components/common/MainModal"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import patchJoin from "@/services/game/room/patchJoin"
import useUserStore from "@/stores/UserStore"
import useIngameThemeStore from "@/stores/IngameTheme"
import Swal from "sweetalert2"
interface RoomMainModalProps {
  open: boolean
  roomData: {
    title: string
    capacity: number
    startedAt: Date
    category: number
    userId: number
    uuid: string
    nickname: string
    hasPassword: true
  }
  handleClose: () => void
}
const RoomPasswordModal = ({
  open,
  handleClose,
  roomData,
}: RoomMainModalProps) => {
  const router = useRouter()
  const [password, setPassword] = useState<string>("")
  const { userUuid } = useUserStore()
  const { setRoomTitle, setSelectedTheme } = useIngameThemeStore()
  const onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value)
  }

  const confirmPassword = async () => {
    try {
      const response = await patchJoin({
        roomUuid: roomData.uuid,
        userUuid: userUuid || "",
        password: password,
      })
      handleClose()
      setSelectedTheme(roomData.category)
      setRoomTitle(roomData.title)
      if (response.status === 200) {
        router.push(`/gameroom/${roomData.uuid}`)
      }
    } catch (error) {
      throw error
    }
  }
  return (
    <MainModal
      isOpen={open}
      onClose={handleClose}
      width="300px"
      height="100px"
      text="비밀번호 입력"
      isFriendModal={false}
    >
      <Input
        type="password"
        onChange={onPasswordChange}
        style={{ margin: "0 5%" }}
      />
      <Button
        text="확인"
        theme="success"
        width="auto"
        onClick={confirmPassword}
      />
    </MainModal>
  )
}

export default RoomPasswordModal
