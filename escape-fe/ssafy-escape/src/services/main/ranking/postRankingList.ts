import API_PATH from "@/constants/path"
import api from "@/services/api"

interface PostRankingListBodyProps {
  status: number
  message: string
  data: PostRankingListDataProps[]
}

interface PostRankingListDataProps {
  rank: number
  nickname: string
  bestTime: string
  themaCategory: number
  profileUrl: string
}

// 테마별 전체 랭킹 정보 조회(20개씩 페이지네이션)
const postRankingList = async (
  pageNumber: number,
  themaCategory: number,
): Promise<PostRankingListDataProps[]> => {
  try {
    const response = await api.post<PostRankingListBodyProps>(
      API_PATH.MAIN.RANKING.LIST,
      {
        pageNumber,
        themaCategory,
      },
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

export default postRankingList

// import dummy from "./postRankingList.json"
// const postRankingList = async (pageNumber: number, themaUuid: string) => {
//   console.log(pageNumber, themaUuid)
//   return dummy
// }

// export default postRankingList
