import API_PATH from "@/constants/path"
import api from "@/services/api"

// 회원 탈퇴
const patchQuit = async (): Promise<null> => {
  try {
    const response = await api.patch<NullBodyProps>(API_PATH.AUTH.QUIT)
    // 아이디 중복시 상태코드 변경(202는 임시)
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }

    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default patchQuit
