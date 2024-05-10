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
    const response = await api.post<PostLoginBodyProps>(API_PATH.AUTH.LOGIN, {
      loginId,
      password,
    })
    // 로그인에서 에러 발생할 때. 현재는 아이디나 비밀번호 잘못 입력하면 AxiosError로 뜬다.
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    } // 존재하지 않는 사용자 or 비밀번호 틀릴 시
    else if (response.status === 4040) {
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
