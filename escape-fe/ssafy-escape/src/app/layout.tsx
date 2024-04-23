import StyledComponentsRegistry from "../lib/registry"
import { Noto_Sans_KR } from "next/font/google"
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
