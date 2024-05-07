import API_PATH from "@/constants/path"
// import api from "/api"

interface PatchJoinRequestProps {
  roomUuid: string
  userUuid: string
}

// // 게임방 참여하기
// const patchJoin = async (
//   data: PatchJoinRequestProps,
// ): Promise<NullBodyProps> => {
//   try {
//     const response = await api.post<NullBodyProps>(
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
