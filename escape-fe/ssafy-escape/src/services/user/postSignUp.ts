// import API_PATH from "@/constants/path"
// import api from "/api"

// interface postSignUpBodyProps {
//   status: number
//   message: string
//   data: null
// }
// // 회원가입
// const postSignUp = async (loginId: string, password: string): Promise<null> => {
//   try {
//     const response = await api.post<postSignUpBodyProps>(API_PATH.AUTH.SIGNUP, {
//       loginId,
//       password,
//     })
//     if (response.data.status === 404) {
//       throw new Error(`오류: ${response.data.message}`)
//     }
//     // 아이디 중복시 상태코드 변경(403은 임시)
//     else if (response.data.status === 403) {
//       throw new Error("중복된 아이디입니다.")
//     }
//     return null
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default postSignUp
