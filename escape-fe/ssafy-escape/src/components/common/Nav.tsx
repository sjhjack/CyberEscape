"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import GroupIcon from "@mui/icons-material/Group"
import HelpIcon from "@mui/icons-material/Help"
import LocalMallIcon from "@mui/icons-material/LocalMall"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { MainColor } from "@/styles/palette"

const Nav = () => {
  const [choice, setChoice] = useState<string | null>("/main")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setChoice(pathname)
  }, [pathname])

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <div>
      <hr style={{ margin: "10px 20px" }} />
      <MainContainer>
        {/* 중복 있어서 나중에 컴포넌트화 시키면 좋을 듯*/}

        {choice === "/main" ? (
          <IconBox onClick={() => navigateTo("/main")}>
            <AccountCircleIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>마이홈</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => navigateTo("/main")}>
            <AccountCircleIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>마이홈</TitleText>
          </IconBox>
        )}

        {choice === "/main/friends" ? (
          <IconBox onClick={() => navigateTo("/main/friends")}>
            <GroupIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>친구</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => navigateTo("/main/friends")}>
            <GroupIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>친구</TitleText>
          </IconBox>
        )}

        {choice === "/main/ranking" ? (
          <IconBox onClick={() => navigateTo("/main/ranking")}>
            <EmojiEventsIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>랭킹</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => navigateTo("/main/ranking")}>
            <EmojiEventsIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>랭킹</TitleText>
          </IconBox>
        )}

        {choice === "/main/store" ? (
          <IconBox onClick={() => navigateTo("/main/store")}>
            <LocalMallIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>상점</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => navigateTo("/main/store")}>
            <LocalMallIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>상점</TitleText>
          </IconBox>
        )}

        {choice === "/main/help" ? (
          <IconBox onClick={() => navigateTo("/main/help")}>
            <HelpIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>게임설명</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => navigateTo("/main/help")}>
            <HelpIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>게임설명</TitleText>
          </IconBox>
        )}

        <IconBox onClick={() => navigateTo("/game/mode")}>
          <MeetingRoomIcon
            sx={{ fontSize: "50px", cursor: "pointer", color: MainColor }}
          />
          <TitleText style={{ color: MainColor }}>게임시작</TitleText>
        </IconBox>
      </MainContainer>
    </div>
  )
}

export default Nav

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6px;
`
const TitleText = styled.div`
  font-size: 25px;
  cursor: pointer;
  margin-right: 5px;
`
const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
