import { useEffect, useMemo } from "react"

// 패널티에 따른 효과음 재생
const PlaySound = ({ penalty, role }: PlaySoundProps) => {
  const soundArray = useMemo(() => {
    return role === "experiment"
      ? [
          "pounding_on_door",
          "trying_to_open_a_locked_door",
          "footstep_drag_indoors",
          "horror_sfx",
          "lift_door_bangs",
        ]
      : [
          "pounding_on_door",
          "footstep_drag_indoors",
          "horror_sfx",
          "lift_door_bangs",
          "laugh",
        ]
  }, [role])

  useEffect(() => {
    if (penalty === 1 || penalty === 3 || penalty === 5 || penalty === 7) {
      const randomIndex = Math.floor(Math.random() * soundArray.length)
      const audio = new Audio(
        `${process.env.NEXT_PUBLIC_IMAGE_URL}/sound/${soundArray[randomIndex]}.mp3`,
      )
      audio.play()
    }
  }, [penalty, soundArray])

  return null
}

export default PlaySound
