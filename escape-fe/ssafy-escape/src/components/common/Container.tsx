"use client"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

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
        <BackIcon onClick={() => router.back()}>
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
