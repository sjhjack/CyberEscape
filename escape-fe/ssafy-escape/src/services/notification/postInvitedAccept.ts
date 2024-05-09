// import API_PATH from "@/constants/path"
// import api from "/api"

// // 친구 초대 수락
// const postInvitedAccept = async (
//   roomUuid: string,
//   userUuid: string, // 초대에 응하는 유저(나)
// ): Promise<null> => {
//   try {
//     const response = await api.post<NullBodyProps>(
//       API_PATH.INVITE.INVITED_ACCEPT,
//       {
//         roomUuid,
//         userUuid,
//       },
//     )
//     if (response.data.status === 400) {
//       throw new Error(`오류: ${response.data.message}`)
//     }
//     return null
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default postInvitedAccept
