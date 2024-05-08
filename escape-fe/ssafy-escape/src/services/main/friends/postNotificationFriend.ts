import API_PATH from "@/constants/path"
import api from "@/services/api"
import { headers } from "next/headers"

interface PostNotificationFriendBodyProps {
  status: number
  message: string
  data: PostNotificationFriendDataProps[]
}

interface PostNotificationFriendDataProps {
  //requestUserUuid: string // 요청한 사람의 id
  nickname: string // 요청한 사람의 닉네임
}

// 받은 친구 요청 리스트
const postNotificationFriend =
  async (): Promise<PostNotificationFriendDataProps> => {
    const accessToken = sessionStorage.getItem("access_token");
    try {
      const response = await api.post<PostNotificationFriendBodyProps>(
        API_PATH.MAIN.FRIEND.NOTIFICATION,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      if (response.status !== 400) {
        throw new Error(`오류: ${response.data.message}`)
      }
      return response.data.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

export default postNotificationFriend

// import dummy from "./postNotificationFriend.json"
// const postNotificationFriend = async () => {
//   return dummy
// }

// export default postNotificationFriend
