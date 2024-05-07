import { Noto_Sans_KR } from "next/font/google"
import StyledComponentsRegistry from "../lib/registry"
import QueryProvider from "../hooks/QueryClientProvider"
import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
})

const Layout = ({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <html>
      <body className={notoSansKr.className}>
        <QueryProvider>
          <StyledComponentsRegistry>
            {children}
            {modal}
          </StyledComponentsRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}

export default Layout
