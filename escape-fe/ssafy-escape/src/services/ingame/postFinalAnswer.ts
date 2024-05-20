import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostFinalAnswerDataProps {
  isRight: boolean
}

interface PostFinalAnswerResponseProps {
  status: number
  message: string
  data: PostFinalAnswerDataProps
}

// 정답 전송
const postFinalAnswer = async (
  quizUuid: string,
  answer: string,
): Promise<PostFinalAnswerDataProps> => {
  try {
    const response = await api.post<PostFinalAnswerResponseProps>(
      API_PATH.INGAME.FINAL_ANSWER,
      {
        quizUuid,
        answer,
      },
    )
    if (response.data.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postFinalAnswer
