import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PatchExitRequestProps {
  roomUuid: string
  userUuid: string
}

// 게임방 나가기
const patchExit = async (
  data: PatchExitRequestProps,
): Promise<NullBodyProps> => {
  try {
    const response = await api.patch<NullBodyProps>(
      API_PATH.GAME.MULTI.ROOM.EXIT,
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

export default patchExit
