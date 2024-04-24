"use client"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import HomeIcon from "@mui/icons-material/Home"
import LogoutIcon from "@mui/icons-material/Logout"
// import useUserStore from "@/stores/UserStore"

interface HeaderProps {
  Icon: React.ElementType
  text: string
  onClick: () => void
}

// // 로그아웃 버튼 클릭 시
// const handleLogout = async () => {
//   try {
//     await logout()
//     alert("로그아웃 성공!")
//     router.push("/")
//   } catch (error) {
//     console.error(error)
//     if (error instanceof Error) {
//       alert(error.message)
//     }
//   }
// }

const MainHeader = () => {
  const router = useRouter()
  // const { logout } = useUserStore()

  const headerItems = [
    { Icon: HomeIcon, text: "홈", onClick: () => router.push("/") },
    {
      Icon: LogoutIcon,
      text: "로그아웃",
      onClick: () => {
        // handleLogout()
      },
    },
    {
      Icon: NotificationsNoneIcon,
      text: "알림",
      onClick: () => {
        // 알림 모달 띄우기
      },
    },
  ]

  const HeaderItem = ({ Icon, text, onClick }: HeaderProps) => (
    <Box onClick={onClick}>
      <IconBox>
        <Icon style={{ color: "white", fontSize: "40px", cursor: "pointer" }} />
      </IconBox>
      <Text style={{ marginRight: text === "홈" ? "7px" : "0" }}>{text}</Text>
    </Box>
  )

  return (
    <MainContainer>
      {headerItems.map(({ Icon, text, onClick }, index) => (
        <HeaderItem key={index} Icon={Icon} text={text} onClick={onClick} />
      ))}
    </MainContainer>
  )
}

export default MainHeader

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 5px;
  margin-right: 10px;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`

const Text = styled.div`
  color: white;
  font-size: 20px;
  cursor: pointer;
`

const IconBox = styled.div`
  color: white;
  font-size: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
`
