// import API_PATH from "@/constants/path"
// import api from "/api"

// interface PostInvitedListBodyProps {
//   status: number
//   message: string
//   data: PostInvitedListDataProps[]
// }

// interface PostInvitedListDataProps {
//   roomUuid: string
//   inviteUserUuid: string
//   nickname: string
// }

// // 친구 목록 조회
// const postInvitedList = async (): Promise<PostInvitedListDataProps> => {
//   try {
//     const response = await api.post<PostInvitedListBodyProps>(
//       API_PATH.INVITE.INVITED_LIST,
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

// export default postInvitedList

import dummy from "./postInvitedList.json"
const postInvitedList = async () => {
  return dummy
}

export default postInvitedList
