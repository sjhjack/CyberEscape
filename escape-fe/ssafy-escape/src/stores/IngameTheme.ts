import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  selectedTheme: number | null
  setSelectedTheme: (theme: number | null) => void
}

const useIngameThemeStore = create<ThemeState>()(
  persist(
    (set): ThemeState => ({
      selectedTheme: null,
      setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

export default useIngameThemeStore
