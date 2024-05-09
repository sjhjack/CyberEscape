import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostUserSearchBodyProps {
  status: number
  message: string
  data: PostUserSearchDataProps[]
}

interface PostUserSearchDataProps {
  nickname: string
}

// 유저 닉네임 검색
const postUserSearch = async (
  nickname: string,
): Promise<PostUserSearchDataProps[]> => {
  const accessToken = sessionStorage.getItem("access_token");
  try {
    const response = await api.post<PostUserSearchBodyProps>(
      API_PATH.MAIN.FRIEND.SEARCH,
      { nickname },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    if (response.status === 400) {
      throw new Error(`오류: ${response.data.message}`)
    }
    return response.data.data;
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default postUserSearch

// import dummy from "./postUserSearch.json"
// const postUserSearch = async (nickname: string) => {
//   console.log(nickname)
//   return dummy
// }

// export default postUserSearch
