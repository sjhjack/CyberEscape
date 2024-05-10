import API_PATH from "@/constants/path"
import api from "@/services/api"

// 회원가입
const postSignUp = async (loginId: string, password: string): Promise<null> => {
  try {
    const response = await api.post<NullBodyProps>(API_PATH.AUTH.SIGNUP, {
      loginId,
      password,
    })
    // 에러 처리
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    // 아이디 중복시
    else if (response.data.status === 4091) {
      throw new Error("중복된 아이디입니다.")
    }
    // 아이디 유효성 검사
    else if (response.data.status === 4092) {
      throw new Error(`아이디 형식이 올바르지 않습니다`)
    }
    // 아이디 유효성 검사
    else if (response.data.status === 4093) {
      throw new Error(`비밀번호 형식이 올바르지 않습니다`)
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postSignUp
