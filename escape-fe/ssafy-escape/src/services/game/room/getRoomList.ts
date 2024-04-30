// import API_PATH from "@/constants/path"
// import api from "/api"

interface GetRoomListBodyProps {
  status: number
  message: string
  data: GetRoomListDataProps[]
}

interface GetRoomListDataProps {
  roomList: roomListDataProps[]
  pagination: paginationDataProps[]
}

interface roomListDataProps {
  title: string
  capacity: number
  startedAt: string
  themaId: number
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

// // 친구 목록 조회
// const getRoomList = async (): Promise<GetRoomListDataProps> => {
//   try {
//     const response = await api.get<GetRoomListBodyProps>(
//       API_PATH.GAME.MULTI.ROOM.LIST,
//     )
//     if (response.status === 400) {
//       throw new Error(`오류: ${response.data.message}`)
//     }
//     return response.data.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default getRoomList

import dummy from "./getRoomList.json"
const getRoomList = async () => {
  return dummy
}

export default getRoomList
