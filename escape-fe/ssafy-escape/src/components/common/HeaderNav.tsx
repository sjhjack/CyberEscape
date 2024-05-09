"use client"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import HomeIcon from "@mui/icons-material/Home"
import LogoutIcon from "@mui/icons-material/Logout"
import GroupIcon from "@mui/icons-material/Group"
import { useEffect, useState } from "react"
import FriendMainModal from "../main/friends/FriendMainModal"
import useUserStore from "@/stores/UserStore"
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import getFriendList from "@/services/main/friends/getFriendList"
import NotificationModal from "../notification/NotificationModal"
import postInvitedList from "@/services/notification/postInvitedList"
import Swal from "sweetalert2"

interface HeaderProps {
  Icon: React.ElementType
  text: string
  onClick: () => void
}

const MainHeader = () => {
  const router = useRouter()
  const { logout } = useUserStore()
  const [friendModalopen, setfriendModalOpen] = useState<boolean>(false)
  const [notificationModalopen, setNotificationModalopen] =
    useState<boolean>(false)

  const handleFriendModalClose = () => {
    setfriendModalOpen(false)
  }
  const handleNotificationModalClose = () => {
    setNotificationModalopen(false)
  }

  const queryClient = new QueryClient()
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["friendList"],
      queryFn: getFriendList,
    }),
      queryClient.prefetchQuery({
        queryKey: ["invitedList"],
        queryFn: postInvitedList,
      })
  }, [])

  // 로그아웃 버튼 클릭 시
  const handleLogout = async () => {
    try {
      await logout()
      Swal.fire("로그아웃 완료")
      router.push("/")
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Swal.fire(
          "로그아웃 실패",
          error instanceof Error ? error.message : "",
          "error",
        )
      }
    }
  }

  const headerItems = [
    { Icon: HomeIcon, text: "홈", onClick: () => router.push("/main") },
    {
      Icon: LogoutIcon,
      text: "로그아웃",
      onClick: () => {
        handleLogout()
      },
    },
    {
      Icon: GroupIcon,
      text: "친구",
      onClick: () => {
        setfriendModalOpen(true)
      },
    },
    {
      Icon: NotificationsNoneIcon,
      text: "알림",
      onClick: () => {
        setNotificationModalopen(true)
      },
    },
  ]

  const HeaderItem = ({ Icon, text, onClick }: HeaderProps) => (
    <Box onClick={onClick}>
      <IconBox>
        <Icon
          style={{
            color: "white",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
      </IconBox>
      <Text
        style={{
          marginRight: text === "홈" || "로그아웃" ? "3px" : "0",
        }}
      >
        {text}
      </Text>
    </Box>
  )

  return (
    <ParentDiv>
      <MainContainer>
        {headerItems.map(({ Icon, text, onClick }, index) => (
          <HeaderItem key={index} Icon={Icon} text={text} onClick={onClick} />
        ))}
      </MainContainer>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <FriendMainModal
          open={friendModalopen}
          onClose={handleFriendModalClose}
        />
      </HydrationBoundary>

      <NotificationModal
        open={notificationModalopen}
        onClose={handleNotificationModalClose}
      />
    </ParentDiv>
  )
}

export default MainHeader

const ParentDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 5px;
  gap: 3px;
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
