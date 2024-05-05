import API_PATH from "@/constants/path"
// import api from "/api"

interface PostInviteRequestProps {
  roomUuid: string
  userUuid: string
}

interface PostInviteResponseProps {
  status: number
  message: string
  data: string
}

// // 친구 초대하기
// const postInvite = async (
//   data: PostInviteRequestProps,
// ): Promise<PostInviteResponseProps> => {
//   try {
//     const response = await api.post<PostInviteRequestProps>(
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
