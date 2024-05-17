"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import Image from "next/image"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import FormatTime from "@/hooks/FormatTime"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import postMyRanking from "@/services/main/ranking/postMyRanking"
import getAutoCreateNickname from "@/services/main/nickname/getAutoCreateNickname"
import postIsDuplicationNickname from "@/services/main/nickname/postIsDuplicationNickname"
import patchNicknameChange from "@/services/main/nickname/patchNicknameChange"
import useUserStore from "@/stores/UserStore"
import Swal from "sweetalert2"
import patchChangeProfileImg from "@/services/user/patchChangeProfileImg"
// import { CircularProgress } from "@mui/material"

interface ImageProps {
  $isActive: boolean
}

const MyProfile = () => {
  const { userUuid, nickname, profileUrl, setNickname, setProfileUrl } =
    useUserStore()
  const themeIdx = [1, 4, 7]
  const themes = ["공포", "싸피", "우주"]

  const [activeTheme, setActiveTheme] = useState<number>(0)
  const [isActiveChangeNickname, setIsActiveChangeNickname] =
    useState<boolean>(false)
  const [newNickname, setNewNickname] = useState<string>("")

  const { data: myRankingData } = useQuery({
    queryKey: ["myRanking", themeIdx[activeTheme]],
    queryFn: () => postMyRanking(themeIdx[activeTheme]),
  })

  console.log(myRankingData)
  // 테마 아이콘 클릭 시
  const handleThemeClick = (index: number) => {
    setActiveTheme(index)
  }

  // 닉네임 저장 버튼 클릭 시
  const handleNicknameSaveClick = async () => {
    const idDuplicate = await postIsDuplicationNickname(nickname || "")
    if (idDuplicate) {
      try {
        await patchNicknameChange(nickname || "", newNickname)
        Swal.fire({
          title: "닉네임 변경 완료!",
          width: "500px",
          padding: "40px",
        })
        setNickname(newNickname)
        setNewNickname("")
        setIsActiveChangeNickname(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      Swal.fire({
        title: "이미 존재하는 닉네임입니다.",
        width: "500px",
        padding: "40px",
      })
    }
  }

  const [profileImg, setProfileImg] = useState<string | undefined>(profileUrl)

  // 프로필 이미지 변경
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setProfileImg(reader.result as string)
        const newImgUrl = await patchChangeProfileImg(file)
        setProfileUrl(newImgUrl)
        Swal.fire({
          title: "프로필 사진 변경 완료!",
          width: "500px",
          padding: "40px",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // 프로필 이미지 수정 버튼 클릭 시
  const handleImgClick = () => {
    const fileInputElement = document.getElementById("fileInput")
    if (fileInputElement) {
      fileInputElement.click()
    }
  }

  // 닉네임 자동 생성 버튼 클릭 시
  const handleAutoNicknameClick = async () => {
    const autoNickname = await getAutoCreateNickname()
    setNewNickname(autoNickname)
  }

  // if (isLoading) {
  //   return <CircularProgress />
  // }
  if (!myRankingData) {
    return <div>데이터 없음</div>
  }

  return (
    <ProfileContainer>
      <NicknameMainBox>
        {isActiveChangeNickname ? (
          <EditBox>
            <ShuffleIconBox onClick={() => handleAutoNicknameClick()}>
              <ShuffleIcon sx={{ fontSize: "30px" }} />
            </ShuffleIconBox>
            <Input
              placeholder={nickname ? nickname : "닉네임을 입력하세요"}
              value={newNickname}
              onChange={(event) => setNewNickname(event.target.value)}
            />
            {newNickname ? (
              <CustomHighlightOffIcon
                onClick={() => {
                  setNewNickname("")
                }}
              />
            ) : null}
            <Button
              text="저장"
              theme="success"
              width="55px"
              onClick={() => handleNicknameSaveClick()}
            />
            <Button
              text="닫기"
              theme="fail"
              width="55px"
              onClick={() => setIsActiveChangeNickname(false)}
            />
          </EditBox>
        ) : (
          <NicknameSubBox>
            <SubText>{nickname}</SubText>
            <BlackEditIcon
              src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/edit_black.png"}
              alt="닉네임 수정 아이콘"
              width={25}
              height={25}
              onClick={() => setIsActiveChangeNickname(!isActiveChangeNickname)}
            />
          </NicknameSubBox>
        )}
      </NicknameMainBox>

      <ImageContainer>
        <ProfileImg src={profileImg} alt="내 프로필 이미지" />
        <WhiteEditIcon
          src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/edit_white.png"}
          alt="프로필 이미지 수정 아이콘"
          width={25}
          height={25}
          onClick={() => handleImgClick()}
        />
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleChangeImg}
        />
      </ImageContainer>

      <ThemeMainBox>
        {themes.map((theme, index) => (
          <ThemeSubBox key={index} onClick={() => handleThemeClick(index)}>
            <ThemeIcon
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                `/image/${themeIdx[index]}emoticon.png`
              }
              alt={theme}
              width={60}
              height={60}
              $isActive={activeTheme === index}
            />
            <div
              style={{
                fontWeight: activeTheme === index ? "bold" : "normal",
                fontSize: "18px",
              }}
            >
              {theme}
            </div>
          </ThemeSubBox>
        ))}
      </ThemeMainBox>
      <MyRankBox>
        <SubText>나의 최고 기록</SubText>
        {myRankingData.bestTime !== "00:00:00" ? (
          <SubText style={{ color: "#dd3232" }}>
            {FormatTime(myRankingData.bestTime)}
          </SubText>
        ) : (
          <NoTimeText>
            클리어 기록이 없습니다. 지금 바로 도전해보세요!
          </NoTimeText>
        )}
      </MyRankBox>
    </ProfileContainer>
  )
}

export default MyProfile

// 닉네임, 나의 최고 기록 스타일
const SubText = styled.div`
  font-size: 22px;
  word-break: keep-all;
  text-align: center;
`

const NoTimeText = styled.div`
  margin-top: 5px;
  font-size: 14px;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 20px;
  width: 320px;
  border-radius: 20px;
`

const NicknameMainBox = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  height: 40px;
`

const NicknameSubBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const ThemeMainBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const ShuffleIconBox = styled.div`
  cursor: pointer;
`

const EditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 4vw;
  position: relative;
`

const ThemeSubBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
const MyRankBox = styled.div`
  text-align: center;
  width: 150px;
  height: 65px;
`

const ThemeIcon = styled(Image)<ImageProps>`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.$isActive ? "scale(1.2)" : "scale(1)")};
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`

const BlackEditIcon = styled(Image)`
  opacity: 0.5;
  cursor: pointer;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5));
`

const WhiteEditIcon = styled(BlackEditIcon)`
  position: absolute;
  bottom: 13px;
  right: 13px;
`

const ProfileImg = styled.img`
  border-radius: 30px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`

const CustomHighlightOffIcon = styled(HighlightOffIcon)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  right: 125px;
  opacity: 50%;
  cursor: pointer;
`
