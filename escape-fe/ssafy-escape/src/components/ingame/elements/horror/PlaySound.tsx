import { useEffect } from "react"

interface PlaySoundProps {
  soundNum: number
  fanalty: number
}
// 효과음 재생
const PlaySound = ({ soundNum, fanalty }: PlaySoundProps) => {
  useEffect(() => {

    if (soundNum === 1) {
      const audio = new Audio("music/HorrorBgm.mp3")
      audio.play()
    } else if (soundNum === 2) {
      const audio = new Audio("music/HorrorBgm.mp3")
      audio.play()
    }

    if (fanalty === 2) {
      const audio = new Audio("music/HorrorBgm.mp3")
      audio.play()
    }
    
  }, [soundNum, fanalty])
  return null
}

export default PlaySound
