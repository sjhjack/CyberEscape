import { create } from "zustand"

interface IngameSolvedProps {
  solved: number
  setSolved: (solved: number) => void
}

const useIngameSolvedStore = create<IngameSolvedProps>((set) => ({
  solved: 0,
  setSolved: (solved: number) => set({ solved }),
}))

export default useIngameSolvedStore
