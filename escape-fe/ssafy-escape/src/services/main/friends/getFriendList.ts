import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetFriendListBodyProps {
  status: number
  message: string
  data: GetFriendListDataProps[] 
}

interface GetFriendListDataProps {
  friendNickname: string
  friendUuid: string
}

// 친구 목록 조회
const getFriendList = async (): Promise<GetFriendListDataProps[]> => {
  
  const accessToken = sessionStorage.getItem("access_token")
  try {
    const response = await api.get<GetFriendListBodyProps>(
      API_PATH.MAIN.FRIEND.LIST + "?pageNumber=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
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

// export default postFriendList

// import dummy from "./postFriendList.json"
// const postFriendList = async () => {
//   return dummy
// }

export default getFriendList
