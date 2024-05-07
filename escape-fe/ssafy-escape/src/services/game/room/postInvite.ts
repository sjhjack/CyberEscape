import API_PATH from "@/constants/path"
// import api from "/api"

interface PostInviteRequestProps {
  roomUuid: string
  userUuid: string
}

// // 친구 초대하기
// const postInvite = async (
//   data: PostInviteRequestProps,
// ): Promise<NullBodyProps> => {
//   try {
//     const response = await api.post<NullBodyProps>(
//       API_PATH.GAME.MULTI.ROOM.INVITE,
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

// export default postInvite
const postInvite = async () => {
  const response = 1
  return response
}

export default postInvite
