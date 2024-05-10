import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetNotificationSubscribe {
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
const getNotificationSubscribe = async (

): Promise<string> => {
  const accessToken = sessionStorage.getItem("access_token");
  console.log("SUBSCRIBE TOKEN : ");
  console.log(accessToken);
  try {
    const response = await api.get<GetNotificationSubscribe>(
      API_PATH.MAIN.NOTIFICATION.SUBSCRIBE,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return "";
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getNotificationSubscribe
