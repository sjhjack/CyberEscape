import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetFriendListBodyProps {
  status: number
  message: string
  data: GetFriendListDataProps[]
}

interface GetFriendListDataProps {
  nickname: string
  friendUuid: string
  profile: string
}

// 친구 목록 조회
const getFriendList = async (
  pageNumber: number,
): Promise<GetFriendListDataProps[]> => {
  try {
    const response = await api.get<GetFriendListBodyProps>(
      `${API_PATH.MAIN.FRIEND.LIST}?pageNumber=${pageNumber}`,
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

export default getFriendList
