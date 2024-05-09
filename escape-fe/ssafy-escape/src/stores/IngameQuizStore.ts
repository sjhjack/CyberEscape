import { create } from "zustand"

interface IngameQuizProps {
  quizData: QuizDataProps[] | null
  setQuizData: (quizData: QuizDataProps[]) => void
  solved: number
  setSolved: (solved: number) => void
}

const useIngameQuizStore = create<IngameQuizProps>((set) => ({
  solved: 2,
  setSolved: (solved: number) => set({ solved }),
  quizData: null,
  setQuizData: (quizData) => set({ quizData }),
}))

export default useIngameQuizStore
