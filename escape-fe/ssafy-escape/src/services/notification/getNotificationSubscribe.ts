import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetNotificationSubscribe {
  status: number
  message: string
  data: string
}

// 알림 subscribe
const getNotificationSubscribe = async (): Promise<string> => {
  try {
    const response = await api.get<GetNotificationSubscribe>(
      API_PATH.MAIN.NOTIFICATION.SUBSCRIBE,
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return ""
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getNotificationSubscribe
