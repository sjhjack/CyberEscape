"use client"
import { ReactNode } from "react"
import styled from "styled-components"

interface ContainerProps {
  children: ReactNode
}
const Container = ({ children }: ContainerProps) => {
  return <ContainerStyle>{children}</ContainerStyle>
}

const ContainerStyle = styled.div`
  width: 70vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -50%);
  padding: 20px;
`

export default Container
