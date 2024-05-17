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
  useQuery,
} from "@tanstack/react-query"
import getFriendList from "@/services/main/friends/getFriendList"
import NotificationModal from "../notification/NotificationModal"
import getNotificationList from "@/services/notification/getNotificationList"
import Swal from "sweetalert2"
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill"
import { Badge, formControlClasses } from "@mui/material"
import { MainColor } from "@/styles/palette"

interface HeaderProps {
  Icon: React.ElementType
  text: string
  onClick: () => void
}

const MainHeader = () => {
  const router = useRouter()
  const { logout } = useUserStore()
  const [friendModalopen, setfriendModalOpen] = useState<boolean>(false)
  const [isFriendAlram, setIsFriendAlram] = useState<boolean>(false)
  const [isInviteAlram, setIsInviteAlram] = useState<boolean>(false)
  const [notificationModalopen, setNotificationModalopen] =
    useState<boolean>(false)

  const EventProvider = () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = sessionStorage.getItem("access_token")
    // if(accessToken == null) return;
    let eventSource = new EventSource(
      process.env.NEXT_PUBLIC_URL + "/notify/subscribe",
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
          Authorization: `Bearer ${accessToken}`,
        },

        heartbeatTimeout: 120000,
      },
    )

    console.log("EVENT !!!!!")
    eventSource.onmessage = function (event) {
      console.log("New event from server:", event.data)
    }
    eventSource.addEventListener("sse", function (event) {
      console.log(event)
      console.log("알림 도착")
      //setMessages(prevMessages => [...prevMessages, event.data]);
    })

    eventSource.onerror = function (error) {
      console.log("ERROR OCCUR")
      console.log(error)
      setTimeout(async function () {
        await eventSource.close()

        eventSource = new EventSource(
          process.env.NEXT_PUBLIC_URL + "/notify/subscribe",
          {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
              "X-Accel-Buffering": "no",
              Authorization: `Bearer ${accessToken}`,
            },
            heartbeatTimeout: 120000,
          },
        )
      }, 2000)
    }

    return () => {
      eventSource.close()
    }
  }

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
      queryFn: () => getFriendList(1),
    }),
      queryClient.prefetchQuery({
        queryKey: ["notificationList"],
        queryFn: getNotificationList,
      }),
      EventProvider()
  }, [])

  const { data: requestData } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })

  useEffect(() => {
    if (requestData) {
      const hasFriendNotification = requestData.some(
        (data) => data.type === "FRIEND",
      )
      const hasGameNotification = requestData.some(
        (data) => data.type === "GAME",
      )

      setIsFriendAlram(hasFriendNotification)
      setIsInviteAlram(hasGameNotification)
    }
  }, [requestData])

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
        {(isFriendAlram && text === "친구") ||
        (isInviteAlram && text === "알림") ? (
          <Badge variant="dot" color="error">
            <Icon
              style={{
                color: "white",
                fontSize: "40px",
                cursor: "pointer",
              }}
            />
          </Badge>
        ) : (
          <Icon
            style={{
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
            }}
          />
        )}
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
