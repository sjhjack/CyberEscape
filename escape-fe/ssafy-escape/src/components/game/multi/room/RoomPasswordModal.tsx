"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MainModal from "@/components/common/MainModal"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
interface RoomMainModalProps {
  open: boolean
  handleClose: () => void
}
const RoomPasswordModal = ({ open, handleClose }: RoomMainModalProps) => {
  const [password, setPassword] = useState<string>("")

  const onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value)
  }

  const confirmPassword = (): void => {
    // if (password === router.query.password) {
    //   onClose()
    //   router.push(`/room/${router.query.id}`)
    // } else {
    //   alert("비밀번호가 일치하지 않습니다.")
    // }
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
