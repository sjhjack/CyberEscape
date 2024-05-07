"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import HelpIcon from "@mui/icons-material/Help"
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

  return (
    <div>
      <hr style={{ margin: "10px 20px" }} />
      <MainContainer>
        {/* 중복 있어서 나중에 컴포넌트화 시키면 좋을 듯*/}

        {choice === "/main" ? (
          <IconBox onClick={() => router.push("/main")}>
            <AccountCircleIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>마이홈</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => router.push("/main")}>
            <AccountCircleIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>마이홈</TitleText>
          </IconBox>
        )}

        {choice === "/main/ranking" ? (
          <IconBox onClick={() => router.push("/main/ranking")}>
            <EmojiEventsIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>싱글랭킹</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => router.push("/main/ranking")}>
            <EmojiEventsIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>싱글랭킹</TitleText>
          </IconBox>
        )}

        {choice === "/main/help" ? (
          <IconBox onClick={() => router.push("/main/help")}>
            <HelpIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
            <TitleText>게임설명</TitleText>
          </IconBox>
        ) : (
          <IconBox onClick={() => router.push("/main/help")}>
            <HelpIcon
              sx={{ fontSize: "50px", cursor: "pointer" }}
              color="disabled"
            />
            <TitleText style={{ color: "gray" }}>게임설명</TitleText>
          </IconBox>
        )}

        <IconBox onClick={() => router.push("/main/mode")}>
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
