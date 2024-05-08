import React, { useEffect, useState } from "react"
import styled from "styled-components"

interface ContainerProps {
  opacity: number
}

interface StartProps {
  setSubtitle: (subtitle: string) => void
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
  const [isNull, setIsNull] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [sequence, setSequence] = useState(1)
  const [containerOpacity, setContainerOpacity] = useState(1)

  useEffect(() => {
    if (sequence === 2) {
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

  const handleClick = () => {
    if (sequence === 1) {
      setShowInstruction(false)
      dub1()
    }
  }

  const dub1 = () => {
    setSubtitle("... ... ...")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setContainerOpacity(0)
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
    // // 비명소리 들어갈 곳
    // const audio = new Audio("dubbing/space/start/start_5.mp3")
    // audio.play()
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
