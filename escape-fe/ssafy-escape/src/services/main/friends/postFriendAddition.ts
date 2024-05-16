import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostFriendAdditionBodyProps {
  status: number
  message: string
  data: string
}

// 친구 수락
const postFriendAddition = async (toUserUuid: string): Promise<string> => {
  try {
    const response = await api.post<PostFriendAdditionBodyProps>(
      API_PATH.MAIN.FRIEND.ADDITION,
      {
        toUserUuid,
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

export default postFriendAddition
