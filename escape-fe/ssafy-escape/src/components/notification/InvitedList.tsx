"use client"

import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import Button from "../common/Button"
//import postInvitedList from "@/services/notification/postInvitedList"
// import postInvitedAccept from "@/services/notification/postInvitedAccept"
import getNotificationList from "@/services/notification/getNotificationList"

const InvitedList = () => {
  const { data: invitedData, isLoading } = useQuery({
    queryKey: ["invitedList"],
    queryFn: () => getNotificationList(),
  })

  const handleAccept = async () => {
    // await postInvitedAccept(roomUuid, userUuid)
    // 초대된 방으로 이동하는 로직
  }

  const handleDeny = async () => {
    // 초대 거절 시 처리
  }

  if (isLoading) {
    return <div>로딩 중</div>
  }

  if (!invitedData) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      {invitedData.data.map((user, i) => (
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
                onClick={handleAccept}
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
