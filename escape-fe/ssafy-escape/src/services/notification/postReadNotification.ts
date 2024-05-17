import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostReadNotificationDataProps {
  status: number
  message: string
  data: string
}

// 알림 읽음 처리
const postReadNotification = async (objectId: string): Promise<string> => {
  try {
    const response = await api.post<PostReadNotificationDataProps>(
      API_PATH.MAIN.NOTIFICATION.READ,
      {
        objectId,
      },
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postReadNotification
