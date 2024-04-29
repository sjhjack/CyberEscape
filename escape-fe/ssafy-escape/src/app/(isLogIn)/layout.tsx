import MainHeader from "@/components/common/HeaderNav"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  )
}

export default Layout
