import { useEffect, useState } from "react"
import styled from "styled-components"

interface ContainerProps {
  opacity: number
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 10;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s ease;
`

const Instructions = styled.div`
  text-align: center;
`

const Start = ({ setSubtitle }: StartProps) => {
  const [sequence, setSequence] = useState(0)
  const [showInstruction, setShowInstruction] = useState(true)
  const [containerOpacity, setContainerOpacity] = useState(1)
  const [isNull, setIsNull] = useState(false)

  const handleClick = () => {
    setSequence(1)
    setShowInstruction(false)
  }

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
    const new_audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + `/music/SsafyBgm.mp3`,
    )
    new_audio.play()
    new_audio.loop = true
    setSubtitle("뭐야 그 사이 잠깐 졸았었네")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setContainerOpacity(0)
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
    setIsNull(true)
  }

  return !isNull ? (
    <Container opacity={containerOpacity} onClick={handleClick}>
      {showInstruction ? (
        <Instructions>
          <p>Click to start</p>
        </Instructions>
      ) : null}
    </Container>
  ) : null
}

export default Start
