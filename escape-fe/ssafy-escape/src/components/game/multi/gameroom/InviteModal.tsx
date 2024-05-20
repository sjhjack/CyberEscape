"use client"
import React, { useEffect } from "react"
import MainModal from "@/components/common/MainModal"
import Button from "@/components/common/Button"
import styled from "styled-components"
import getFriendList from "@/services/main/friends/getFriendList"
import postInvite from "@/services/game/room/postInvite"
import { useInfiniteQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import Swal from "sweetalert2"

interface InviteModalProps {
  open: boolean
  handleClose: () => void
}

const InviteModal = ({ open, handleClose }: InviteModalProps) => {
  const pathname: string = usePathname()
  const roomUuid: string = pathname.substring(10)
  const {
    data: friendsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["friendList"],
    queryFn: ({ pageParam }) => getFriendList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })

  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [open, refetch])

  const handleScroll = (event: Event) => {
    const target = event.target as Document
    if (
      target.documentElement.scrollTop + window.innerHeight + 200 >=
      target.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // 초대 요청 시
  const sendInvitation = (roomUuid: string, userUuid: string) => {
    postInvite({
      roomUuid: roomUuid,
      userUuid: userUuid ? userUuid : "",
    })
    Swal.fire({
      title: "초대 요청 완료!",
      width: "400px",
      padding: "40px",
    })
    handleClose()
  }

  if (!friendsData) {
    return <div>데이터 없음</div>
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
      {friendsData.pages.map((page, i) => (
        <div key={i}>
          {page.length !== 0 ? (
            <>
              {page.map((friend, idx) => (
                <SubContainer key={idx}>
                  <ProfileBox>
                    <ProfileImg src={friend.profile} alt="프로필 이미지" />
                    <div>{friend.nickname}</div>
                  </ProfileBox>
                  <Button
                    text="초대"
                    theme="success"
                    width="60px"
                    height="40px"
                    onClick={() => {
                      sendInvitation(roomUuid, friend.friendUuid)
                    }}
                  />
                </SubContainer>
              ))}
            </>
          ) : null}
        </div>
      ))}
    </MainModal>
  )
}

export default InviteModal

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px;
  font-size: 17px;
  border-radius: 0.25rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  object-fit: cover;
`
