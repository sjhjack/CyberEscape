import useIngameThemeStore from "@/stores/IngameTheme"
import { useEffect, useState } from "react"

// 유저의 화면 클릭 이후 음악이 재생됩니다.
const PlayMusic = () => {
  const [musicStarted, setMusicStarted] = useState(false)
  const { selectedTheme } = useIngameThemeStore()
  useEffect(() => {
    let audio: any
    const startMusic = () => {
      if (selectedTheme === 7) {
        audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "/music/SpeckInTime.mp3",
        )
        audio.play()
        audio.loop = true
      } else if (selectedTheme === 1 || selectedTheme === 2) {
        const audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "/music/HorrorBgm.mp3",
        )
        audio.play()
        audio.loop = true
      } else if (selectedTheme === 3) {
        audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "/music/HorrorBgm2.mp3",
        )
        audio.play()
        audio.loop = true
      } else if (selectedTheme === 4 || selectedTheme === 5) {
        const audio = new Audio("music/SsafyBgm.mp3")
        audio.play()
        audio.loop = true
      } else if (selectedTheme === 6) {
        const audio = new Audio("music/SsafyBgm2.mp3")
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
      if (audio) {
        audio.pause()
        audio = null
      }
    }
  }, [musicStarted])

  return null
}

export default PlayMusic
