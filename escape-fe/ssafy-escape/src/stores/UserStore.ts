import { create } from "zustand"
import { persist } from "zustand/middleware"
import postLogout from "../services/user/postLogout"
import postLogin from "../services/user/postLogin"

interface UserState {
  loginId: string | null
  isLogin: boolean
  // nickname: string | null
  // imgUrl: string | null
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  login: (loginId: string, password: string) => void
  logout: () => Promise<void>
}
const useUserStore = create<UserState>()(
  persist(
    (set): UserState => ({
      loginId: null,
      isLogin: false,
      // nickname: null,
      // imgUrl: null,
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),

      login: async (loginId: string, password: string) => {
        try {
          const response = await postLogin(loginId, password)
          if (response.accessToken) {
            set({
              isLogin: true,
              // nickname: response.nickname,
              // imgUrl: response.imgUrl,
              accessToken: response.accessToken,
            })
          } else {
            throw new Error("로그인 실패")
          }
        } catch (error) {
          console.error(error)
          throw error
        }
      },

      logout: async () => {
        try {
          await postLogout()
          set({
            loginId: null,
            isLogin: false,
            // nickname: null,
            // imgUrl: null,
            accessToken: null,
          })
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
)

export default useUserStore
