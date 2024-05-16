"use client"

import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import Button from "@/components/common/Button"
import { useQuery } from "@tanstack/react-query"
import postReadNotification from "@/services/notification/postReadNotification"
// import postFriendRequest from "@/services/main/friends/postFriendAddition"
import postFriendAddition from "@/services/main/friends/postFriendAddition";
import getFriendList from "@/services/main/friends/getFriendList"
import getNotificationList from "@/services/notification/getNotificationList"
import { StyledString } from "next/dist/build/swc"

// 받은 친구 요청 목록 조회
const FriendRequestActions = () => {
  const { data: requestData } = useQuery({
    queryKey: ["getNotificationList"],
    queryFn: () => getNotificationList(),
  })


  const handleRequest = async (requestUserUuid: string, notificationId : string) => {
    // console.log("친구 채팅")

    // console.log("친구 수락 완료")
    await postFriendAddition(requestUserUuid)
    
    // 읽음 처리
    postReadNotification(notificationId);
  }

  const handleDeny = async (notificationId : string) => {
    postReadNotification(notificationId);
  }

  return (
    <div>
      <Text>받은 친구 요청 목록</Text>
      {requestData?.filter((data)=> data.type === "FRIEND")
                  .map((user) => (
        <div key={user.senderUuid}>
          <SubContainer>
            <ProfileBox>
              <PersonIcon sx={{ fontSize: "35px" }} />
              <div>{user.nickname}</div>
            </ProfileBox>
            <ButtonBox>
              <Button
                text="수락"
                theme="success"
                width="60px"
                onClick={() => handleRequest(user.senderUuid, user.id)}
              />
              <Button 
                text="거절" 
                theme="fail" 
                width="60px" 
                onClick={() => handleDeny(user.id)}
               />
              {/* 거절 누르면 안보이도록 처리?? 백엔드와 논의 */}
            </ButtonBox>
          </SubContainer>
        </div>
      ))}
    </div>
  )
}

export default FriendRequestActions

const Text = styled.div`
  padding-left: 5px;
  font-weight: bold;
`
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
const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`
