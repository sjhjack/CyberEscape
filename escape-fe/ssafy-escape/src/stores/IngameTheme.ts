import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  selectedTheme: number
  setSelectedTheme: (theme: number) => void
  selectedThemeType: "multi" | "single" | null
  setSelectedThemeType: (theme: "multi" | "single" | null) => void
  roomTitle: string | null
  setRoomTitle: (roomTitle: string) => void
  roomUuid: string | null
  setRoomUuid: (roomUuid: string) => void
}

const useIngameThemeStore = create<ThemeState>()(
  persist(
    (set): ThemeState => ({
      selectedThemeType: null,
      setSelectedThemeType: (selectedThemeType: "multi" | "single" | null) =>
        set({ selectedThemeType }),
      selectedTheme: 1,
      setSelectedTheme: (selectedTheme: number) => set({ selectedTheme }),
      roomTitle: null,
      setRoomTitle: (roomTitle: string) => set({ roomTitle }),
      roomUuid: null,
      setRoomUuid: (roomUuid: string) => set({ roomUuid }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

export default useIngameThemeStore
