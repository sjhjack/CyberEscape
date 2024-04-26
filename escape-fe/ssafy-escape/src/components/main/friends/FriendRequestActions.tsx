"use client"

import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import Button from "@/components/common/Button"
// import postFriendRequest from "@/services/main/friends/postFriendAddition"

// 받은 친구 요청 목록 조회(추후 api 생기면 연결 필요)
const FriendRequestActions = () => {
//   const handleRequest = async (id: string) => {
//     console.log("친구 수락 완료")
//     await postFriendRequest(myid, id)
//   }
  return (
    <div>
      <Text>받은 친구 요청</Text>
      <SubContainer>
        <ProfileBox>
          <PersonIcon sx={{ fontSize: "35px" }} />
          <div>이싸피</div>
        </ProfileBox>
        <ButtonBox>
          <Button
            text="수락"
            theme="success"
            width="60px"
            // onClick={() => handleRequest(id)}
          />
          <Button text="거절" theme="fail" width="60px" />
          {/* 거절 누르면 안보이도록 처리 */}
        </ButtonBox>
      </SubContainer>
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
