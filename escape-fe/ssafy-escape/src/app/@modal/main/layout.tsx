"use client"
import { styled } from "styled-components"
import Container from "@/components/common/Container"
import FooterNav from "@/components/common/FooterNav"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      {children}
      <SubContainer>
        <FooterNav />
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
