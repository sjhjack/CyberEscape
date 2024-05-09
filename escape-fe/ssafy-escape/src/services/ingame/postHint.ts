import API_PATH from "@/constants/path"
import api from "@/services/api"

interface postQuizDataProps {
  hint: string
}

interface postQuizResponseProps {
  status: number
  message: string
  data: postQuizDataProps
}

// 힌트 가져오기
const postHint = async (quizUuid: string): Promise<postQuizDataProps> => {
  try {
    const response = await api.post<postQuizResponseProps>(
      API_PATH.INGAME.HINT,
      {
        quizUuid,
      },
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data}`)
    }
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postHint
