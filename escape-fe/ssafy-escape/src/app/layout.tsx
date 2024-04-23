import { Noto_Sans_KR } from "next/font/google"
import StyledComponentsRegistry from "../lib/registry"
import "./globals.css"
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={notoSansKr.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
