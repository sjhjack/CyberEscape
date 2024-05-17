import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostFriendDeleteBodyProps {
  status: number
  message: string
  data: string
}

// 친구 삭제
const postDeleteFriend = async (friendUuid: string): Promise<string> => {
  try {
    const response = await api.post<PostFriendDeleteBodyProps>(
      API_PATH.MAIN.FRIEND.DELETE,
      { friendUuid },
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

export default postDeleteFriend
