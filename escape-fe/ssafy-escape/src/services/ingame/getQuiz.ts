import API_PATH from "@/constants/path"
import api from "@/services/api"


interface getQuizResponseProps {
  status: number
  message: string
  data: QuizDataProps[]
}

// 퀴즈 가져오기
const getQuiz = async (themaId: number): Promise<QuizDataProps[]> => {
  try {
    const response = await api.get<getQuizResponseProps>(
      `${API_PATH.INGAME.QUIZ}/${themaId}`,
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

export default getQuiz
