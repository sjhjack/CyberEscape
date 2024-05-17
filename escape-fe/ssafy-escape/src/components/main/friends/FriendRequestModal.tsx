"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import Button from "@/components/common/Button"
import MainModal from "@/components/common/MainModal"
import Input from "@/components/common/Input"
import postUserSearch from "@/services/main/friends/postUserSearch"
import postFriendRequest from "@/services/main/friends/postFriendRequest"
import Swal from "sweetalert2"

interface FriendRequestModalProps {
  open: boolean
  onClose: () => void
}

// 친구 추가 모달(검색)
const FriendRequestModal = ({ open, onClose }: FriendRequestModalProps) => {
  const [keyword, setKeyword] = useState<string>("")
  const handleClose = () => {
    setKeyword("")
    onClose()
  }

  const { data: searchData, refetch } = useQuery({
    queryKey: ["searchUser", keyword],
    queryFn: () => postUserSearch(keyword),
    enabled: false,
  })

  // 검색 시
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      refetch()
    }
  }

  //
  const handleRequest = async (id: string) => {
    await postFriendRequest(id, "FRIEND")
    Swal.fire({
      title: "친구 요청 완료!",
      width: "500px",
      padding: "40px",
    })
  }

  return (
    <div>
      <MainModal isOpen={open} onClose={handleClose} text="친구 추가">
        <InputBox onSubmit={(e) => handleSearch(e)}>
          <Input
            $width="60%"
            $textIndent="25px"
            placeholder="닉네임을 입력해주세요."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <CustomSearchIcon onClick={(e) => handleSearch(e)} />
          {keyword ? (
            <CustomHighlightOffIcon
              onClick={() => {
                setKeyword("")
              }}
            />
          ) : null}
        </InputBox>
        {!searchData || searchData.length === 0 ? (
          <EmptyText>결과가 없습니다.</EmptyText>
        ) : (
          <div>
            {searchData.map((user, i) => (
              <div key={i}>
                <MainContainer>
                  <ProfileBox>
                    <ProfileImg src={user.profileUrl} alt="프로필 이미지" />
                    <div>{user.nickname}</div>
                  </ProfileBox>
                  {user.relationship === "추가" ? (
                    <Button
                      text={user.relationship}
                      theme="success"
                      width="60px"
                      onClick={() => handleRequest(user.userUuid)}
                    />
                  ) : null}
                </MainContainer>
              </div>
            ))}
          </div>
        )}
      </MainModal>
    </div>
  )
}

export default FriendRequestModal

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 17px;
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

const EmptyText = styled.div`
  padding: 10px;
  text-align: center;
`
const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 10px;
`

const CustomSearchIcon = styled(SearchIcon)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  left: 6.8vw;
  cursor: pointer;
`
const CustomHighlightOffIcon = styled(HighlightOffIcon)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  right: 6.8vw;
  opacity: 50%;
  cursor: pointer;
`
