import { useEffect, useState } from "react"

// 유저의 화면 클릭 이후 음악이 재생됩니다.
const PlayMusic = () => {
  const [musicStarted, setMusicStarted] = useState(false)

  useEffect(() => {
    const startMusic = () => {
      const audio = new Audio("music/SpeckInTime.mp3")
      audio.play()
      audio.loop = true
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
