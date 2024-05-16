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
    setSubtitle("뭐야 그 사이 잠깐 졸았었네")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 4000)
  }

  const dub2 = () => {
    setTimeout(() => {
      setSubtitle("아 오늘 날씨도 좋은데 한강이나 가고 싶다")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 4000)
    }, 5000)
  }

  const dub3 = () => {
    setSubtitle("몰래 도망가버릴까...?")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub4 = () => {
    setTimeout(() => {
      setSubtitle("프로님 죄송합니다!!!!!")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 6000)
    }, 3000)
  }

  const dub5 = () => {
    setSubtitle("노트북에 뭔가 단서가 있을 것 같아.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub6 = () => {
    setSubtitle("칠판도 좀 수상한데?")
    setTimeout(() => {
      setSubtitle("")
    }, 10000)
  }

  return <></>
}

export default Start
