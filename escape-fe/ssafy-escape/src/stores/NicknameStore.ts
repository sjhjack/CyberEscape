import { create } from "zustand"

interface Nickname {
  nickname: string
}

const useNicknameStore = create<Nickname>((set) => ({
  nickname: `참가자${Math.floor(Math.random() * 100 + 1)}`,
  setNickname: (nickname: string) => set({ nickname: nickname }),
}))

export default useNicknameStore
