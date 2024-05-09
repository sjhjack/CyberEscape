// import API_PATH from "@/constants/path"
// import api from "/api"

// // 친구 신청
// const postFriendRequest = async (
//   userUuid: string,
//   friendUuid: string,
// ): Promise<null> => {
//   try {
//     const response = await api.post<NullBodyProps>(
//       API_PATH.MAIN.FRIEND.REQUEST,
//       {
//         userUuid,
//         friendUuid,
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

// export default postFriendRequest
