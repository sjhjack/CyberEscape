"use client"
import { ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import styled from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import useIngameThemeStore from "@/stores/IngameTheme"
import useUserStore from "@/stores/UserStore"
import patchExit from "@/services/game/room/patchExit"
interface ContainerProps {
  children: ReactNode
  isBackButton?: boolean // 뒤로 가기 버튼 유무
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  backgroundColor?: string
  gap?: string
}
interface ContainerStyleProps {
  $display?: string
  $flexDirection?: string
  $justifyContent?: string
  $alignItems?: string
  $backgroundColor?: string
  $gap?: string
}
const Container = ({
  isBackButton = true,
  children,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  backgroundColor,
  gap,
}: ContainerProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split("/")
  const { roomUuid } = useIngameThemeStore()
  const { userUuid } = useUserStore()
  const gameOut = async () => {
    try {
      const rr = await patchExit({
        roomUuid: roomUuid || "",
        userUuid: userUuid || "",
      })
    } catch (e) {
      console.error(e)
    }
  }
  const movePage = async () => {
    if (segments[1] === "gameroom") {
      await gameOut()
      window.location.href = "/main"
    } else if (segments[1] === "main" && segments[2] === "multi") {
      router.push("/main")
    } else {
      router.back()
    }
  }
  return (
    <ContainerStyle
      $display={display}
      $flexDirection={flexDirection}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $backgroundColor={backgroundColor}
      $gap={gap}
    >
      {isBackButton ? (
        <BackIcon onClick={() => movePage()}>
          <ArrowBackIosNewIcon />
        </BackIcon>
      ) : null}
      {children}
    </ContainerStyle>
  )
}

export default Container

const ContainerStyle = styled.div<ContainerStyleProps>`
  width: 70vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 30px;
  background: ${(props) =>
    props.$backgroundColor ? `none` : `rgba(255, 255, 255, 0.8)`};
  transform: translate(-50%, -50%);
  padding: 20px;
  display: ${(props) => props.$display};
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  gap: ${(props) => props.$gap};
`
const BackIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`
