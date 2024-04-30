// import API_PATH from "@/constants/path"
// import api from "/api"

// interface PostLoginBodyProps {
//   status: number
//   message: string
//   data: UserInfo
// }

// // 로그인
// const postLogin = async (
//   loginId: string,
//   password: string,
// ): Promise<UserInfo> => {
//   try {
//     const response = await api.post<PostLoginBodyProps>(API_PATH.AUTH.LOGIN, {
//       loginId,
//       password,
//     })
//     // 아이디 중복시 상태코드 변경(202는 임시)
//     if (response.status === 400) {
//       throw new Error(`오류: ${response.data.message}`)
//     } else if (response.status === 202) {
//       throw new Error("중복된 아이디입니다.")
//     }

//     // // 존재하지 않는 사용자로 로그인 시도 시(데이터 or 상태코드 보고 수정필요)
//     // if (!response.user) {
//     //   throw new Error("사용자를 찾을 수 없습니다.")
//     // }

//     return response.data.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default postLogin
