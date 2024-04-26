// import API_PATH from "@/constants/path"
// import api from "/api"

// // 친구 삭제
// const deleteFriend = async (
//   userUuid: string,
//   friendUuid: string,
// ): Promise<null> => {
//   try {
//     const response = await api.delete<NullBodyProps>(
//       API_PATH.MAIN.FRIEND.DELETE,
//       { userUuid, friendUuid },
//     )
//     if (response.data.status !== 200) {
//       throw new Error(`오류: ${response.data.message}`)
//     }
//     return null
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default deleteFriend
