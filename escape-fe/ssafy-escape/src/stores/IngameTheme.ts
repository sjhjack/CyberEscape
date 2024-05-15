import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  selectedTheme: number | null
  setSelectedTheme: (theme: number) => void
  selectedThemeType: "multi" | "single" | null
  setSelectedThemeType: (theme: "multi" | "single" | null) => void
}

const useIngameThemeStore = create<ThemeState>()(
  persist(
    (set): ThemeState => ({
      selectedThemeType: null,
      setSelectedThemeType: (selectedThemeType: "multi" | "single" | null) =>
        set({ selectedThemeType }),
      selectedTheme: null,
      setSelectedTheme: (selectedTheme: number) => set({ selectedTheme }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

export default useIngameThemeStore
