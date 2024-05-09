import { useEffect } from "react"

interface PlaySoundProps {
  soundNum: number
  penalty: number
}
// 효과음 재생
const PlaySound = ({ soundNum, penalty }: PlaySoundProps) => {
  useEffect(() => {
    if (soundNum === 1) {
      const audio = new Audio("sound/woman_scream.mp3")
      audio.play()
    } else if (soundNum === 2) {
      const audio = new Audio("sound/door_bang.mp3")
      audio.play()
    }

    if (penalty === 1) {
      const audio = new Audio("sound/pounding-on-door-44023.mp3")
      audio.play()
    } else if (penalty === 2) {
      const audio = new Audio("sound/trying-to-open-a-locked-door.mp3")
      audio.play()
    }
  }, [soundNum, penalty])
  return null
}

export default PlaySound
