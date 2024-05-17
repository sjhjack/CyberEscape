import { create } from "zustand"

interface IngameQuizProps {
  solved: number
  setSolved: (solved: number) => void
  hint: number
  setHint: (hint: number) => void
}

const useIngameQuizStore = create<IngameQuizProps>((set) => ({
  solved: 0,
  setSolved: (solved: number) => set({ solved }),
  hint: 1,
  setHint: (hint: number) => set({ hint }),
}))

export default useIngameQuizStore
