"use client"

import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import Button from "../common/Button"
//import postInvitedList from "@/services/notification/postInvitedList"
// import postInvitedAccept from "@/services/notification/postInvitedAccept"
import getNotificationList from "@/services/notification/getNotificationList"
import postFriendAddition from "@/services/main/friends/postFriendAddition"

// 게임 초대 요청 리스트
const InvitedList = () => {
  const { data: invitedList, isLoading } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })


  const handleAccept = async (roomUuid : string) => {
    // await postInvitedAccept(roomUuid, userUuid)
    
    // 초대된 방으로 이동하는 로직
  }

  const handleDeny = async () => {
    // 초대 거절 시 처리
  }

  if (isLoading) {
    return <div>로딩 중</div>
  }

  if (!invitedList) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      {invitedList
        .filter((data) => data.type === "GAME")
        .map((user, i) => (
        <div key={i}>
          <MainContainer>
            <ProfileBox>
              <PersonIcon sx={{ fontSize: "35px" }} />
              <div>{user.nickname}</div>
            </ProfileBox>
            <ButtonBox>
              <Button
                text="수락"
                theme="success"
                width="60px"
                onClick={() => handleAccept(user.roomUuid)}
              />
              <Button
                text="거절"
                theme="fail"
                width="60px"
                onClick={() => handleDeny()}
              />
            </ButtonBox>
          </MainContainer>
        </div>
      ))}
    </div>
  )
}

export default InvitedList

const MainContainer = styled.div`
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
const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
`
