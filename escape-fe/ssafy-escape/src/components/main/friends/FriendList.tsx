"use client"

import { styled } from "styled-components"
import { useInfiniteQuery } from "@tanstack/react-query"
import Button from "@/components/common/Button"
import getFriendList from "@/services/main/friends/getFriendList"
import useModalStore from "@/stores/ModalStore"
import postDeleteFriend from "@/services/main/friends/postDeleteFriend"
import Swal from "sweetalert2"
import { useEffect } from "react"

// 친구 목록 불러오는 컴포넌트
const FriendList = () => {
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

  const { isDeleteMode } = useModalStore()

  // 친구 삭제 버튼 클릭 시
  const handleDelete = async (friendUuid: string) => {
    await postDeleteFriend(friendUuid)
    Swal.fire({
      title: "친구 삭제 완료!",
      width: "500px",
      padding: "40px",
    })
    refetch()
  }

  if (!friendsData) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
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
                  {isDeleteMode && (
                    <Button
                      text="삭제"
                      theme="fail"
                      width="60px"
                      onClick={() => handleDelete(friend.friendUuid)}
                    />
                  )}
                </SubContainer>
              ))}
            </>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default FriendList

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
