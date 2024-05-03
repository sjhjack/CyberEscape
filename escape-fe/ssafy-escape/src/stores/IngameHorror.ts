import { create } from "zustand"

interface IngameHorrorProps {
  isFlowerShow: boolean
  setIsFlowerShow: (isShow: boolean) => void
}

const useIngameHorrorStore = create<IngameHorrorProps>((set) => ({
  isFlowerShow: true,
  setIsFlowerShow: (isShow: boolean) => set({ isFlowerShow: isShow }),
}))

export default useIngameHorrorStore
