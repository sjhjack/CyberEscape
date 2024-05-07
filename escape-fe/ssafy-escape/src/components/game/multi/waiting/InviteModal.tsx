"use client"
import React, { useEffect, useState } from "react"
import MainModal from "@/components/common/MainModal"
import Button from "@/components/common/Button"
import styled from "styled-components"
import postFriendList from "@/services/main/friends/postFriendList"
import postInvite from "@/services/game/room/postInvite"
import { useQuery } from "@tanstack/react-query"

interface InviteModalProps {
  open: boolean
  handleClose: () => void
}
interface friendListProps {
  friendNickname: string
  friendUuid: string
}
const InviteModal = ({ open, handleClose }: InviteModalProps) => {
  const { data: friendsData, isLoading } = useQuery({
    queryKey: ["friendList"],
    queryFn: postFriendList,
  })
  return (
    <MainModal
      isOpen={open}
      onClose={handleClose}
      width="350px"
      height="300px"
      text="친구 초대"
      isFriendModal={false}
    >
      {friendsData?.data.map((data, index) => {
        return (
          <FriendsList key={index}>
            <p>{data.friendNickname}</p>
            <Button
              text="초대"
              theme="success"
              width="60px"
              height="40px"
              onClick={() => {
                postInvite
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
