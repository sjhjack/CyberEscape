"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import PersonIcon from "@mui/icons-material/Person"
import SearchIcon from "@mui/icons-material/Search"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import Button from "@/components/common/Button"
import MainModal from "@/components/common/MainModal"
import Input from "@/components/common/Input"
import postUserSearch from "@/services/main/friends/postUserSearch"
// import postFriendRequest from "@/services/main/friends/postFriendRequest"

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(keyword + "로 검색")
    refetch()
  }
  // const handleRequest = async (id: string) => {
  //   await postFriendRequest(myid, id)
  //   console.log("친구 요청")
  // }

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
        {!searchData ? (
          <EmptyText>결과가 없습니다.</EmptyText>
        ) : (
          <div>
            {searchData?.data.map((user, i) => (
              <div key={i}>
                <MainContainer>
                  <ProfileBox>
                    <PersonIcon sx={{ fontSize: "35px" }} />
                    <div>{user.nickname}</div>
                  </ProfileBox>
                  <Button
                    text="요청"
                    theme="success"
                    width="60px"
                    // onClick={() => handleRequest(user.id)}
                  />
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
  gap: 5px;
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
