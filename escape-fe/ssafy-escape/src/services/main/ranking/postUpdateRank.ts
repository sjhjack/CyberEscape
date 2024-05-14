import API_PATH from "@/constants/path"
import api from "@/services/api"

// 나의 최고 기록 갱신
const postUpdateRank = async (
  clearTime: string,
  userUuid: string,
  themaCategory: number,
): Promise<null> => {
  try {
    const response = await api.post<NullBodyProps>(
      API_PATH.MAIN.RANKING.UPDATE_RANK,
      {
        clearTime,
        userUuid,
        themaCategory,
      },
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postUpdateRank
