import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostAcceptanceRequestProps {
  roomUuid: string
}
interface PostAcceptanceResponseProps {
  roomUuid: string
  title: string
  themaCategory: number
}
interface ResponseDataProps {
  message: string
  data: PostAcceptanceResponseProps
  status: number
}
// 게임방 초대 응하기
const postAcceptance = async (
  data: PostAcceptanceRequestProps,
): Promise<ResponseDataProps> => {
  try {
    const response = await api.post<ResponseDataProps>(
      API_PATH.GAME.MULTI.ROOM.ACCEPT,
      data,
    )
    console.log("초대 수락 응답", response)
    if (response.status === 400) {
      throw new Error(`오류: ${response.data}`)
    }
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postAcceptance
