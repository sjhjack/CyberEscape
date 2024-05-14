"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MainModal from "@/components/common/MainModal"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import patchJoin from "@/services/game/room/patchJoin"
import useUserStore from "@/stores/UserStore"
import Swal from "sweetalert2"
interface RoomMainModalProps {
  open: boolean
  roomData: {
    title: string
    capacity: number
    startedAt: Date
    themaId: number
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
  const onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value)
  }

  const confirmPassword = async () => {
    const response = await patchJoin({
      roomUuid: roomData.uuid,
      userUuid: userUuid || "",
      password: password,
    })
    handleClose()
    if (response.status === 200) {
      router.push(`/main/multi/waiting/${roomData.uuid}`)
    } else if (response.status === 8000) {
      Swal.fire("비밀번호가 일치하지 않습니다.")
      return
    } else if (response.status === 8001) {
      Swal.fire("대기방 입장 최대 인원을 초과했습니다.")
      return
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
