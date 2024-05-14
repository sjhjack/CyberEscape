import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostReadNotificationDataProps {
  status: number
  message: string
  data: string
}

// interface GetNotificationSubscribeDataProps {
//   roomUuid: string
//   inviteUserUuid: string
//   nickname: string
// }



// 알림 subscribe
const PostReadNotification = async (
): Promise<string> => {
  const accessToken = sessionStorage.getItem("access_token");
  console.log("SUBSCRIBE TOKEN : ");
  console.log(accessToken);
  try {
    const response = await api.get<PostReadNotificationDataProps>(
      API_PATH.MAIN.NOTIFICATION.READ
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data;
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default PostReadNotification
