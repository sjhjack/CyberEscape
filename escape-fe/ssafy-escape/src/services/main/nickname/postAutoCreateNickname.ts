// import API_PATH from "@/constants/path"
// import api from "/api"

// interface postAutoCreateNicknameBodyProps {
//   status: number
//   message: string
//   data: postAutoCreateNicknameDataProps
// }

// interface postAutoCreateNicknameDataProps {
//   words: string[]
//   seed: string
// }

// // 닉네임 자동 생성
// const postAutoCreateNickname =
//   async (): Promise<postAutoCreateNicknameDataProps> => {
//     try {
//       const response = await api.post<postAutoCreateNicknameBodyProps>(
//         API_PATH.MAIN.NICKNAME.AUTO_CREATE,
//       )
//       if (response.status === 400) {
//         throw new Error(`오류: ${response.data.message}`)
//       }
//       return response.data.data[0]
//     } catch (error) {
//       console.error(error)
//       throw error
//     }
//   }

// export default postAutoCreateNickname

import dummy from "./postAutoCreateNickname.json"
const postAutoCreateNickname = async () => {
  return dummy
}

export default postAutoCreateNickname
