// import { create } from "zustand"
// import { persist } from "zustand/middleware"
// import deleteLogout from "../services/user/deleteLogout"
// import postLogin from "../services/user/postLogin"

// interface UserState {
//   loginId: string | null
//   isLogin: boolean
//   accessToken: string | null
//   setAccessToken: (token: string | null) => void
//   login: (loginId: string, password: string) => void
//   logout: () => Promise<void>
// }
// const useUserStore = create<UserState>()(
//   persist(
//     (set): UserState => ({
//       loginId: null,
//       isLogin: false,
//       accessToken: null,
//       setAccessToken: (token) => set({ accessToken: token }),

//       login: async (loginId: string, password: string) => {
//         try {
//           const response = await postLogin(loginId, password)
//           if (response.accessToken) {
//             set({
//               isLogin: true,
//               accessToken: response.accessToken,
//             })
//           } else {
//             throw new Error("로그인 실패")
//           }
//         } catch (error) {
//           console.error(error)
//           throw error
//         }
//       },

//       logout: async () => {
//         try {
//           await deleteLogout()
//           set({
//             loginId: null,
//             isLogin: false,
//             accessToken: null,
//           })
//         } catch (error) {
//           console.error(error)
//         }
//       },
//     }),
//     {
//       name: "user-storage",
//     },
//   ),
// )

// export default useUserStore
