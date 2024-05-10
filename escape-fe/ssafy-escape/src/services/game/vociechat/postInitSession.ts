import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostRequestProps {
  roomUuid: string
}
interface PostResponseProps {
  status: number
  message: string
  data: PostDataProps
}

interface PostDataProps {
  sessionId: string
}
// 게임방 초대 응하기
const postInitSession = async (
  data: PostRequestProps,
): Promise<PostResponseProps> => {
  try {
    const response = await api.post<PostResponseProps>(
      API_PATH.GAME.MULTI.VOICE.SESSION,
      data,
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postInitSession
