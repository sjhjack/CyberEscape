"use client"

import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import Button from "@/components/common/Button"
import { useQuery } from "@tanstack/react-query"
import postReadNotification from "@/services/notification/postReadNotification"
import postFriendAddition from "@/services/main/friends/postFriendAddition"
import getNotificationList from "@/services/notification/getNotificationList"
import Swal from "sweetalert2"
import { useFriendContext } from "./FriendMainModal"
import { useEffect } from "react"

// 받은 친구 요청 목록 조회
const FriendRequestActions = () => {
  const { data: requestData, refetch } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })

  useEffect(() => {
    refetch()
  }, [])

  const { refetchFriends } = useFriendContext()

  // 친구 요청 수락 눌렀을 시
  const handleRequest = async (
    requestUserUuid: string,
    notificationId: string,
  ) => {
    await postFriendAddition(requestUserUuid)
    // 읽음 처리
    await postReadNotification(notificationId)
    Swal.fire("친구 추가 완료")
    refetchFriends()
    refetch()
  }

  // 친구 요청 거절 눌렀을 시
  const handleDeny = async (notificationId: string) => {
    // 읽음 처리
    await postReadNotification(notificationId)
    Swal.fire("친구 요청을 거절했습니다.")
    refetch()
  }

  return (
    <div>
      <Text>받은 친구 요청 목록</Text>
      {requestData?.length === 0 ? (
        <NoText>받은 친구 요청이 없습니다.</NoText>
      ) : null}
      {requestData
        ?.filter((data) => data.type === "FRIEND")
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
const NoText = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 5px;
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
