import { create } from "zustand"

interface IngameQuizProps {
  solved: number
  setSolved: (solved: number) => void
}

const useIngameQuizStore = create<IngameQuizProps>((set) => ({
  solved: 0,
  setSolved: (solved: number) => set({ solved }),
}))

export default useIngameQuizStore
