import API_PATH from "@/constants/path"
// import api from "/api"

interface PatchJoinRequestProps {
  roomUuid: string
  userUuid: string
}

interface PatchJoinResponseProps {
  status: number
  message: string
  data: string
}

// // 친구 초대하기
// const patchJoin = async (
//   data: PatchJoinRequestProps,
// ): Promise<PatchJoinResponseProps> => {
//   try {
//     const response = await api.post<PatchJoinRequestProps>(
//       API_PATH.GAME.MULTI.ROOM.JOIN,
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

// export default patchJoin
