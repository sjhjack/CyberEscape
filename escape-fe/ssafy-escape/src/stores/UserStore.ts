import { create } from "zustand"
import { persist } from "zustand/middleware"
import postLogout from "../services/user/postLogout"
import postLogin from "../services/user/postLogin"

interface UserState {
  isLogin: boolean
  isHost: boolean
  userUuid: string | null
  nickname: string | null
  profileUrl: string | null
  accessToken: string | null
  setIsHost: (value: boolean) => void
  setNickname: (name: string) => void
  setAccessToken: (token: string | null) => void
  login: (loginId: string, password: string) => void
  logout: () => Promise<void>
}
const useUserStore = create<UserState>()(
  persist(
    (set): UserState => ({
      isLogin: false,
      isHost: false,
      setIsHost: (value) => set({ isHost: value }),
      userUuid: null,
      nickname: null,
      setNickname: (name) => set({ nickname: name }),
      profileUrl: null,
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      login: async (loginId: string, password: string) => {
        try {
          const response = await postLogin(loginId, password)
          if (response.accessToken) {
            set({
              isLogin: true,
              userUuid: response.userUuid,
              nickname: response.nickname,
              profileUrl: response.profileUrl,
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
            isLogin: false,
            isHost: false,
            userUuid: null,
            nickname: null,
            profileUrl: null,
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
