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
      setContainerOpacity(0)
      setSubtitle("")
    }, 4000)
  }

  const dub2 = () => {
    setSubtitle("이번 실험은 반드시 성공시켜야 해. 반드시...!")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 4000)
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
