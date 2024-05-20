import API_PATH from "@/constants/path"
import api from "@/services/api"

interface getAutoCreateNicknameBodyProps {
  status: number
  message: string
  data: string
}

// 닉네임 자동 생성
const getAutoCreateNickname = async (): Promise<string> => {
  try {
    const response = await api.get<getAutoCreateNicknameBodyProps>(
      API_PATH.MAIN.NICKNAME.AUTO_CREATE,
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getAutoCreateNickname

// import dummy from "./postAutoCreateNickname.json"
// const postAutoCreateNickname = async () => {
//   return dummy
// }

// export default postAutoCreateNickname
