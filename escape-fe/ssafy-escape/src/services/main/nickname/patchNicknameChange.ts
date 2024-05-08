import API_PATH from "@/constants/path"
import api from "@/services/api"
// 닉네임 변경
const patchNicknameChange = async (
  currentNickname: string,
  newNickname: string,
): Promise<null> => {
  try {
    const response = await api.patch<NullBodyProps>(
      API_PATH.MAIN.NICKNAME.CHANGE,
      { currentNickname, newNickname },
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default patchNicknameChange
