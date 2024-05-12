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
    } else if (sequence === 6) {
      dub6()
    }
  }, [sequence])

  const dub1 = () => {
    setSubtitle("... ... ...")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 4000)
  }

  const dub2 = () => {
    setTimeout(() => {
      setSubtitle("여긴 어디지?")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 4000)
    }, 5000)
  }

  const dub3 = () => {
    setSubtitle("납치 당한건가?")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub4 = () => {
    const audio = new Audio("sound/man_scream.mp3")
    audio.play()
    setTimeout(() => {
      setSubtitle("무슨 소리지?!")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 6000)
    }, 3000)
  }

  const dub5 = () => {
    setSubtitle("빨리 여기서 나가야 해.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub6 = () => {
    setSubtitle(
      "...근데 저 침대 밑의 물체는 뭐지? 안에 무언가가 들어있는 것 같아.",
    )
    setTimeout(() => {
      setSubtitle("")
    }, 10000)
  }

  return <></>
}

export default Start
