// import API_PATH from "@/constants/path"
// import api from "/api"

// interface PostRefreshTokenBodyProps {
//   status: number
//   message: string
//   data: UserInfoProps
// }

// // 리프레시 토큰 재발급
// const postRefreshToken = async (
//   loginId: string,
//   grantType: string,
//   accessToken: string,
//   refreshToken: string,
// ): Promise<UserInfoProps> => {
//   try {
//     const response = await api.post<PostRefreshTokenBodyProps>(
//       API_PATH.AUTH.REFRESH_ACCESSTOKEN,
//       {
//         loginId,
//         grantType,
//         accessToken,
//         refreshToken,
//       },
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

// export default postRefreshToken
