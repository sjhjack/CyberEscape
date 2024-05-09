import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostLogoutBodyProps {
  status: number
  message: string
  data: string
}

// 로그아웃
const postLogout = async (): Promise<null> => {
  try {
    const response = await api.post<PostLogoutBodyProps>(API_PATH.AUTH.LOGOUT)
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

export default postLogout
