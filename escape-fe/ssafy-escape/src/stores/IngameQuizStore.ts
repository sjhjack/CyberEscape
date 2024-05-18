import { create } from "zustand"

interface IngameQuizState {
  solved: number
  hint: number
}

interface IngameQuizAction {
  setSolved: (solved: number) => void
  hint: number
  setHint: (hint: number) => void
  reset: () => void
}

const initialState: IngameQuizState = {
  solved: 0,
  hint: 1,
}
const useIngameQuizStore = create<IngameQuizState & IngameQuizAction>(
  (set) => ({
    ...initialState,
    setSolved: (solved: number) => set({ solved }),
    hint: 1,

    setHint: (hint: number) => set({ hint }),
    reset: () => {
      set(initialState)
    },
  }),
)

export default useIngameQuizStore
