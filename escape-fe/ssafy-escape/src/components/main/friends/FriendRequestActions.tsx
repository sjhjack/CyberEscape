"use client"

import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import Button from "@/components/common/Button"
import { useQuery } from "@tanstack/react-query"
import postNotificationFriend from "@/services/main/friends/postNotificationFriend"
// import postFriendRequest from "@/services/main/friends/postFriendAddition"

// 받은 친구 요청 목록 조회
const FriendRequestActions = () => {
  const { data: requestData } = useQuery({
    queryKey: ["friendRequestList"],
    queryFn: () => postNotificationFriend(),
  })
  // myid는 현재 로그인된 나의 uuid
  //   const handleRequest = async (requestUserUuid: string) => {
  //     console.log("친구 수락 완료")
  //     await postFriendRequest(myid, requestUserUuid)
  //   }

  return (
    <div>
      <Text>받은 친구 요청</Text>
      {requestData?.data.map((user) => (
        <div key={user.requestUserUuid}>
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
                // onClick={() => handleRequest(user.requestUserUuid)}
              />
              <Button text="거절" theme="fail" width="60px" />
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