import API_PATH from "@/constants/path"
import api from "@/services/api"

interface GetRoomListBodyProps {
  status: number
  message: string
  data: {
    roomList: roomListDataProps[]
    pagination: paginationDataProps
  }
}

interface roomListDataProps {
  title: string
  capacity: number
  startedAt: string
  category: number
  userId: number
  uuid: string
  nickname: string
  hasPasswords: boolean
}

interface paginationDataProps {
  totalRecordCount: number
  totalPageCount: number
  startPage: number
  endPage: number
  limitStart: number
  existPrevPage: boolean
  existNextPage: boolean
}

interface getRoomRequestProps {
  page: number
  // keyword: string
}
// 방 목록 조회
const getRoomList = async ({
  page,
  // keyword,
}: getRoomRequestProps): Promise<GetRoomListBodyProps> => {
  try {
    const response = await api.get<GetRoomListBodyProps>(
      API_PATH.GAME.MULTI.ROOM.LIST,
      { params: { page } },
      // { params: { page, keyword } },
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

export default getRoomList
