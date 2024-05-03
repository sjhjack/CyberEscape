import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  selectedTheme: string | null
  setSelectedTheme: (theme: string | null) => void
}

const useIngameThemeStore = create<ThemeState>()(
  persist(
    (set): ThemeState => ({
      selectedTheme: "space",
      setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

export default useIngameThemeStore
