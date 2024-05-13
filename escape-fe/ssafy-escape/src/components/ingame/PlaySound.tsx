import { useEffect, useState, useMemo } from "react"

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

  // 이미 재생된 사운드 저장하는 문자열 배열 (패널티 최대 3까지만 적용)
  const [playedSounds, setPlayedSounds] = useState<string[]>([])

  useEffect(() => {
    if (penalty > 0 && penalty <= 3 && penalty <= soundArray.length) {
      let newSound: string
      do {
        newSound = soundArray[Math.floor(Math.random() * soundArray.length)]
      } while (playedSounds.includes(newSound))

      setPlayedSounds((prev) => [...prev, newSound])
      const audio = new Audio(`/sound/${newSound}.mp3`)
      audio.play()
    }
  }, [penalty, soundArray, playedSounds])

  return null
}

export default PlaySound
