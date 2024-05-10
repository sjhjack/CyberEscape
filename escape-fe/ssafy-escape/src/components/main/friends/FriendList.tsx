"use client"

import { styled } from "styled-components"
import { useQuery } from "@tanstack/react-query"
import PersonIcon from "@mui/icons-material/Person"
import Button from "@/components/common/Button"
import getFriendList from "@/services/main/friends/getFriendList"
import useModalStore from "@/stores/ModalStore"
// import deleteFriend from "@/services/main/friends/deleteFriend"

// 친구 목록 불러오는 컴포넌트
const FriendList = () => {
  const { data: friendsData, isLoading } = useQuery({
    queryKey: ["friendList"],
    queryFn: getFriendList,
  })
  const { isDeleteMode } = useModalStore()

  // 친구 삭제 버튼 클릭 시
  // const handleDelete = async (friendUuid: string) => {
  //   await deleteFriend(userUuid, friendUuid)
  // }

  const openChat = () => {
    // 채팅방 여는 로직
  }

  if (isLoading) {
    return <div>로딩 중</div>
  }
  if (!friendsData) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      {friendsData.map((friend, i) => (
        <div key={i}>
          <SubContainer>
            <ProfileBox>
              <PersonIcon sx={{ fontSize: "35px" }} />
              <div>{friend.friendNickname}</div>
            </ProfileBox>
            {isDeleteMode ? (
              <Button
                text="삭제"
                theme="fail"
                width="60px"
                // onClick={() => handleDelete(friend.friendUuid)}
              />
            ) : (
              <Button
                text="채팅"
                theme="success"
                width="60px"
                onClick={openChat}
              />
            )}
          </SubContainer>
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
`
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
