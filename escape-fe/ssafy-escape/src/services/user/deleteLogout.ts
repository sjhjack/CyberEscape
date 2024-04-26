// import API_PATH from "@/constants/path"
// import api from "/api"

// interface DeleteLogoutBodyProps {
//   status: number
//   message: string
//   data: string
// }

// // 로그아웃
// const deleteLogout = async (): Promise<null> => {
//   try {
//     const response = await api.delete<DeleteLogoutBodyProps>(
//       API_PATH.AUTH.LOGOUT,
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

// export default deleteLogout
