import useIngameThemeStore from "@/stores/IngameTheme"
import { useEffect, useState } from "react"

// 유저의 화면 클릭 이후 음악이 재생됩니다.
const PlayMusic = () => {
  const [musicStarted, setMusicStarted] = useState(false)
  const { selectedTheme } = useIngameThemeStore()
  useEffect(() => {
    const startMusic = () => {
      if (selectedTheme === 3) {
        const audio = new Audio("music/SpeckInTime.mp3")
        // audio.play()
        audio.loop = true
      } else if (selectedTheme === 1) {
        const audio = new Audio("music/HorrorBgm.mp3")
        audio.play()
        audio.loop = true
      } else if (selectedTheme === 4) {
        const audio = new Audio("music/HorrorBgm2.mp3")
        audio.play()
        audio.loop = true
      }
    }

    const handleClick = () => {
      if (!musicStarted) {
        startMusic()
        setMusicStarted(true)
        document.removeEventListener("click", handleClick)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [musicStarted])

  return null
}

export default PlayMusic
