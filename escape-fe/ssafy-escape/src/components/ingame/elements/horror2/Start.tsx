import { useEffect, useState } from "react"

const Start = ({ setSubtitle }: StartProps) => {
  const [sequence, setSequence] = useState(1)

  useEffect(() => {
    if (sequence === 1) {
      dub1()
    } else if (sequence === 2) {
      dub2()
    } else if (sequence === 3) {
      dub3()
    } else if (sequence === 4) {
      dub4()
    } else if (sequence === 5) {
      dub5()
    }
  }, [sequence])

  const dub1 = () => {
    const new_audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + `/music/HorrorBgm2.mp3`,
    )
    new_audio.play()
    new_audio.loop = true
    setSubtitle("...오랜만에 좋은 실험체를 손에 넣어서 기분이 좋군.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 4000)
  }

  const dub2 = () => {
    setTimeout(() => {
      setSubtitle("이번 실험은 반드시 성공시켜야 해. 반드시...!")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 4000)
    }, 5000)
  }

  const dub3 = () => {
    setSubtitle("...너무 흥분해버렸네. 자, 뭐가 필요하더라?")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub4 = () => {
    setSubtitle("마취가 깨기 전에 얼른 챙길 것만 챙겨서 나가야겠어.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub5 = () => {
    setSubtitle("그 전에 데이터를 먼저 백업해두는 게 낫겠군.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  return <></>
}

export default Start
