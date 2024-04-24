import MainHeader from "@/components/common/MainHeader"

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  )
}

export default LoginLayout
