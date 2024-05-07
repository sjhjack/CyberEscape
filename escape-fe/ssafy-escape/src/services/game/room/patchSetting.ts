import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PatchSettingDataProps {
  title: string
}
interface PatchSettingRequestProps {
  title: string
  password: string
  themaUuid: string
  roomUuid: string
}

interface PatchSettingResponseProps {
  status: number
  message: string
  data: PatchSettingDataProps[]
}

// 게임방 설정 변경
const patchSetting = async (
  data: PatchSettingRequestProps,
): Promise<PatchSettingResponseProps> => {
  try {
    const response = await api.patch<PatchSettingResponseProps>(
      API_PATH.GAME.MULTI.ROOM.SETTING,
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

export default patchSetting
