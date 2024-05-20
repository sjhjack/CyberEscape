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
// 프로방 스크립트 수정 부탁드립니다
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
      process.env.NEXT_PUBLIC_IMAGE_URL + `/music/SsafyBgm2.mp3`,
    )
    new_audio.play()
    new_audio.loop = true
    setSubtitle("싸늘하다. 가슴에 비수가 날아와 꽂힌다.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setContainerOpacity(0)
      setSubtitle("")
    }, 4000)
  }

  const dub2 = () => {
    setTimeout(() => {
      setSubtitle("동작 그만!! ")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 4000)
    }, 5000)
  }

  const dub3 = () => {
    setSubtitle("금쪽이들이 탈출을 시도하는 제보를 입수했다. ")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub4 = () => {
    setTimeout(() => {
      setSubtitle("얼른 내 업무를 마치고 강의장으로 가야 돼")
      setTimeout(() => {
        setSequence((n) => n + 1)
        setSubtitle("")
      }, 6000)
    }, 3000)
  }

  const dub5 = () => {
    setSubtitle("PC에 뭔가 단서가 있을 것 같아.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle("")
    }, 6000)
  }

  const dub6 = () => {
    setSubtitle("시간이 많지 않아. 서둘러")
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
