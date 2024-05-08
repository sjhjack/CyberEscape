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
import postAutoCreateNickname from "@/services/main/nickname/postAutoCreateNickname"
import postIsDuplicationNickname from "@/services/main/nickname/postIsDuplicationNickname"
import patchNicknameChange from "@/services/main/nickname/patchNicknameChange"
import useUserStore from "@/stores/UserStore"
import Swal from "sweetalert2"
interface ImageProps {
  $isActive: boolean
}

const MyProfile = () => {
  const { nickname, profileUrl, setNickname } = useUserStore()
  const userUuid = "임시"
  const themeuuid = ["공포uuid", "싸피uuid", "우주uuid"]
  const themes = ["공포", "싸피", "우주"]

  const [activeTheme, setActiveTheme] = useState<number>(0)
  const [isActiveChangeNickname, setIsActiveChangeNickname] =
    useState<boolean>(false)
  const [newNickname, setNewNickname] = useState<string>("")

  const { data: myRankingData, isLoading } = useQuery({
    queryKey: ["myRanking", themeuuid[activeTheme]],
    queryFn: () => postMyRanking(userUuid, themeuuid[activeTheme]),
  })

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
        Swal.fire("닉네임 변경 완료!")
        setNickname(newNickname)
        setNewNickname("")
        setIsActiveChangeNickname(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      Swal.fire("이미 존재하는 닉네임입니다.")
    }
  }

  const [profileImg, setProfileImg] = useState<string>(
    profileUrl ||
      "https://img.freepik.com/premium-vector/cute-shark-swimming-illustration-shark-mascot-cartoon-characters-animals-icon-concept-isolated_400474-203.jpg",
  )

  // 프로필 이미지 변경
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImg(reader.result as string)
        // reader.result as string으로 프로필 이미지 변경(비동기처리?)
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
    const newNickname = await postAutoCreateNickname()
    setNewNickname(newNickname.words[0])
  }

  if (isLoading) {
    return <div>로딩 중</div>
  }
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
              src="/image/edit_black.png"
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
          src="/image/edit_white.png"
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
              src={`/image/${themes.indexOf(theme) + 1}emoticon.png`}
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

      <div style={{ textAlign: "center" }}>
        <SubText>나의 최고 기록</SubText>
        {myRankingData.data.bestTime ? (
          <SubText style={{ color: "#dd3232" }}>
            {FormatTime(myRankingData.data.bestTime)}
          </SubText>
        ) : (
          <NoTimeText>
            클리어 기록이 없습니다. 지금 바로 도전해보세요!
          </NoTimeText>
        )}
      </div>
    </ProfileContainer>
  )
}

export default MyProfile

// 닉네임, 나의 최고 기록 스타일
const SubText = styled.div`
  font-size: 22px;
`

const NoTimeText = styled.div`
  margin-top: 5px;
  font-size: 18px;
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
