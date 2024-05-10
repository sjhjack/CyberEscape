import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetNotificationFriendProps {
  status: number
  message: string
  data: GetNotificationFriendDataProps[] | string;
}

interface GetNotificationFriendDataProps {
  id : string;
  senderUuid : string;
  roomUuid : string;
  nickname : string;
  content : string;
  type : string;
  isRead : string;
  createdAt: string;
}

// 받은 친구 요청 리스트
const getNotificationFriend =
  async (): Promise<GetNotificationFriendDataProps[]> => {
    const accessToken = sessionStorage.getItem("access_token");
    
    try {
      const response = await api.get<GetNotificationFriendProps>(
        API_PATH.MAIN.NOTIFICATION.LIST,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      if (response.status === 400) {
        throw new Error(`오류: ${response.data.message}`)
      }
      console.log("RESPONSE : ");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(error)
      throw error
    }
  }

export default getNotificationFriend

// import dummy from "./postNotificationFriend.json"
// const postNotificationFriend = async () => {
//   return dummy
// }

// export default postNotificationFriend
