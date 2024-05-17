"use client"
import React, { useEffect, useState } from "react"
import MainModal from "@/components/common/MainModal"
import Button from "@/components/common/Button"
import styled from "styled-components"
import getFriendList from "@/services/main/friends/getFriendList"
import postInvite from "@/services/game/room/postInvite"
import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname } from "next/navigation"
import useUserStore from "@/stores/UserStore"
import Swal from "sweetalert2"
interface InviteModalProps {
  open: boolean
  handleClose: () => void
}
interface friendListProps {
  friendNickname: string
  friendUuid: string
}
const InviteModal = ({ open, handleClose }: InviteModalProps) => {
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(20)
  const { data: friendsData, isLoading } = useQuery({
    queryKey: ["friendList"],
    queryFn: getFriendList,
  })
  const sendInvitation = (roomUuid: string, userUuid: string) => {
    postInvite({
      roomUuid: roomUuid,
      userUuid: userUuid ? userUuid : "",
    })
    Swal.fire("초대 요청을 보냈습니다!")
    handleClose()
  }
  return (
    <MainModal
      isOpen={open}
      onClose={handleClose}
      width="350px"
      height="300px"
      text="친구 초대"
      isFriendModal={false}
    >
      {friendsData?.map((data, index) => {
        return (
          <FriendsList key={index}>
            <p>{data.nickname}</p>
            <Button
              text="초대"
              theme="success"
              width="60px"
              height="40px"
              onClick={() => {
                sendInvitation(roomUuid, data.friendUuid)
              }}
            />
          </FriendsList>
        )
      })}
    </MainModal>
  )
}

export default InviteModal

const FriendsList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
