import API_PATH from "@/constants/path"
import api from "@/services/api"

interface ChangeHostDataProps {
  loginId: string
  nickname: string
  point: number
  characterId: number
}

interface PatchChangeHostRequestProps {
  roomUuid: string
  userUuid: string
}

interface PatchChangeHostResponseProps {
  status: number
  message: string
  data: ChangeHostDataProps[]
}

// 호스트 변경
const patchChangeHost = async (
  data: PatchChangeHostRequestProps,
): Promise<PatchChangeHostResponseProps> => {
  try {
    const response = await api.patch<PatchChangeHostResponseProps>(
      API_PATH.GAME.MULTI.ROOM.CHANGE_HOST,
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

export default patchChangeHost
