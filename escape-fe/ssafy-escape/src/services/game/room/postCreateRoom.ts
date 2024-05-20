import API_PATH from "@/constants/path"
import api from "@/services/api"

interface postCreateRoomResponseProps {
  status: number
  message: string
  data: postCreateRoomDataProps
}
interface postCreateRoomDataProps {
  roomUuid: string
  chatRoomUuid: string
  title: string
}
interface postCreateRoomRequestProps {
  title: string
  category: number
  password: string
  hostUuid: string
}

// 게임방 생성하기
const postCreateRoom = async (
  data: postCreateRoomRequestProps,
): Promise<postCreateRoomResponseProps> => {
  try {
    const response = await api.post<postCreateRoomResponseProps>(
      API_PATH.GAME.MULTI.ROOM.LIST,
      data,
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    console.log("방 생성 완료")
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postCreateRoom
