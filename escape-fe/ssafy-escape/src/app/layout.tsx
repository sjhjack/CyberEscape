"use client"
import { Noto_Sans_KR } from "next/font/google"
import StyledComponentsRegistry from "../lib/registry"
import QueryProvider from "../hooks/QueryClientProvider"
import "./globals.css"
import { usePathname } from "next/navigation"
import useUserStore from "@/stores/UserStore"

// 최상위
import { createContext, useContext, useEffect, useState } from 'react';
import EventProvider from "@/components/EventProvider"

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
  const pathname = usePathname()
  const { isLogin } = useUserStore()
  return (
    <html>
      <body className={notoSansKr.className}>
        <QueryProvider>
            <StyledComponentsRegistry>
              {children}
              {pathname !== "/ingame" && isLogin && modal}
            </StyledComponentsRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}

export default Layout
