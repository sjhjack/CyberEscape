"use client"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import styled from "styled-components"

interface ContainerProps {
  children: ReactNode
  isBackButton?: boolean // 뒤로 가기 버튼 유무
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
}
interface ContainerStyleProps {
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
}
const Container = ({
  isBackButton = true,
  children,
  display,
  flexDirection,
  justifyContent,
  alignItems,
}: ContainerProps) => {
  const router = useRouter()
  return (
    <ContainerStyle
      display={display}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
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
  background: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -50%);
  padding: 20px;
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`
const BackIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`
