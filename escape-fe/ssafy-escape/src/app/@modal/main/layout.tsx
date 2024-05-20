"use client"
import { styled } from "styled-components"
import Container from "@/components/common/Container"
import FooterNav from "@/components/common/FooterNav"
import { usePathname } from "next/navigation"
const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <Container isBackButton={false}>
      {children}
      <SubContainer>
        {pathname === "/main" ||
        pathname === "/main/ranking" ||
        pathname === "/main/help" ? (
          <>
            <FooterNav />
          </>
        ) : null}
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
