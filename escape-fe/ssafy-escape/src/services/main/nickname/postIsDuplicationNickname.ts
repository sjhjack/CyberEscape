import API_PATH from "@/constants/path"
import api from "@/services/api"

// 닉네임 중복 확인
const postIsDuplicationNickname = async (
  nickname: string,
): Promise<boolean> => {
  try {
    const response = await api.post<NullBodyProps>(
      API_PATH.MAIN.NICKNAME.DUPLICATION,
      { nickname },
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postIsDuplicationNickname
