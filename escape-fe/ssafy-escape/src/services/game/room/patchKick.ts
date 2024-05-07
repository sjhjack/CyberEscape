import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PatchKickRequestProps {
  roomUuid: string
  userUuid: string
}

// 게임방 강퇴시키기
const patchKick = async (
  data: PatchKickRequestProps,
): Promise<NullBodyProps> => {
  try {
    const response = await api.patch<NullBodyProps>(
      API_PATH.GAME.MULTI.ROOM.KICK,
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

export default patchKick
