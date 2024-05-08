import API_PATH from "@/constants/path"
import api from "@/services/api"
interface PostLoginBodyProps {
  status: number
  message: string
  data: UserInfoProps
}

// 로그인
const postLogin = async (
  loginId: string,
  password: string,
): Promise<UserInfoProps> => {
  try {
    const accessToken = sessionStorage.getItem("access_token")
    const response = await api.post<PostLoginBodyProps>(
      API_PATH.AUTH.LOGIN,
      {
        loginId,
        password,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    // 아이디 중복시 상태코드 변경
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    } // 존재하지 않는 사용자 or 비밀번호 틀릴 시
    else if (response.status === 403) {
      throw new Error("사용자를 찾을 수 없습니다.")
    }

    sessionStorage.setItem("access_token", response.data.data.accessToken)
    sessionStorage.setItem("refresh_token", response.data.data.refreshToken)
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postLogin
