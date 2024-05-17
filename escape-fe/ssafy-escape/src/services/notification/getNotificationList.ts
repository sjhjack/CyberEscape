import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetNotificationListProps {
  status: number
  message: string
  data: GetNotificationListDataProps[]
}

interface GetNotificationListDataProps {
  id: string
  senderUuid: string
  roomUuid: string
  nickname: string
  profileUrl: string
  content: string
  type: string
  isRead: string
  createdAt: string
}

// 받은 알림 리스트(친구 초대, 친구 요청)
const getNotificationList = async (): Promise<
  GetNotificationListDataProps[]
> => {
  try {
    const response = await api.get<GetNotificationListProps>(
      API_PATH.MAIN.NOTIFICATION.LIST,
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getNotificationList
