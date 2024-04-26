import { Noto_Sans_KR } from "next/font/google"
import StyledComponentsRegistry from "../lib/registry"
import QueryProvider from "../hooks/QueryClientProvider"
import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
})

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html>
      <body className={notoSansKr.className}>
        <QueryProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}

export default Layout