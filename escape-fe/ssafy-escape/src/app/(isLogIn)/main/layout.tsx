"use client"
import { styled } from "styled-components"
import Container from "@/components/common/Container"
import Nav from "@/components/common/Nav"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      {children}
      <SubContainer>
        <Nav />
      </SubContainer>
    </Container>
  )
}

export default Layout

const SubContainer = styled.div`
  position: absolute;
  bottom: 2vh;
  left: 0;
  right: 0;
`
