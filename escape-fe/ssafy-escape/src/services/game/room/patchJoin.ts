import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PatchJoinRequestProps {
  roomUuid: string
  userUuid: string
  password: string
}

// 게임방 참여하기
const patchJoin = async (
  data: PatchJoinRequestProps,
): Promise<NullBodyProps> => {
  try {
    const response = await api.patch<NullBodyProps>(
      API_PATH.GAME.MULTI.ROOM.JOIN,
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

export default patchJoin
