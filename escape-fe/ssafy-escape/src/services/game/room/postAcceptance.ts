import API_PATH from "@/constants/path"
// import api from "/api"

interface PostAcceptanceRequestProps {
  roomUuid: string
  userUuid: string
}

interface PostAcceptanceResponseProps {
  status: number
  message: string
  data: string
}

// // 게임방 초대 응하기
// const postAcceptance = async (
//   data: PostAcceptanceRequestProps,
// ): Promise<PostAcceptanceResponseProps> => {
//   try {
//     const response = await api.post<PostAcceptanceRequestProps>(
//       API_PATH.GAME.MULTI.ROOM.ACCEPT,
//       data,
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

// export default postAcceptance
