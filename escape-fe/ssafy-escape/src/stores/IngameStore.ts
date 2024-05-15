import { create } from "zustand"

interface IngameProps {
  isOpened: boolean
  setIsOpened: (isOpen: boolean) => void
}

const useModalStore = create<IngameProps>((set) => ({
  isOpened: false,
  setIsOpened: (isOpen: boolean) => set({ isOpened: isOpen }),
}))

export default useModalStore
