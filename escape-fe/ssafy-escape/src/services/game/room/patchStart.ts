import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PatchStartRequestProps {
  roomUuid: string
  startedAt: Date
}

interface PatchStartResponseProps {
  status: number
  message: string
  data: PatchStartRequestProps[]
}

// 게임 시작하기
const patchStart = async (
  data: PatchStartRequestProps,
): Promise<PatchStartResponseProps> => {
  try {
    const response = await api.patch<PatchStartResponseProps>(
      API_PATH.GAME.MULTI.ROOM.START,
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

export default patchStart
