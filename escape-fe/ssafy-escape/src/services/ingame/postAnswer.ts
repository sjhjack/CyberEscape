import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostAnswerDataProps {
  clue: string
  order: number
  right: boolean
}

interface PostAnswerResponseProps {
  status: number
  message: string
  data: PostAnswerDataProps
}

// 정답 전송
const postAnswer = async (
  quizUuid: string,
  answer: string,
): Promise<PostAnswerDataProps> => {
  try {
    const response = await api.post<PostAnswerResponseProps>(
      API_PATH.INGAME.ANSWER,
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

export default postAnswer
