import API_PATH from "@/constants/path"
import api from "@/services/api"

interface postHintProps {
  quizUuid: string
}

interface postHintDataProps {
  hint: string
}

interface postHintResponseProps {
  status: number
  message: string
  data: postHintDataProps[]
}

// 힌트 가져오기
const postHint = async (
  data: postHintProps,
): Promise<postHintResponseProps> => {
  try {
    const response = await api.get<postHintResponseProps>(
      API_PATH.INGAME.HINT,
      {
        data: data,
      },
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data}`)
    }
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postHint
