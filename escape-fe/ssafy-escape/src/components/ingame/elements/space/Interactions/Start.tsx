import useIngameThemeStore from "@/stores/IngameTheme"
import React, { useEffect, useRef, useState } from "react"
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
  z-index: 10000;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s ease;
`

const Instructions = styled.div`
  text-align: center;
`

const Start = ({ onAir, setOnAir, setSubtitle }: any) => {
  const [isNull, setIsNull] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [sequence, setSequence] = useState(1)
  const [containerOpacity, setContainerOpacity] = useState(1)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (sequence === 2) {
      dub2()
    } else if (sequence === 3) {
      dub3()
    } else if (sequence === 4) {
      dub4()
    } else if (sequence === 5) {
      dub5()
    }
  }, [sequence])

  const handleClick = () => {
    if (sequence === 1 && !onAir) {
      // onMusicStart()
      setOnAir(true)
      dub1()
      setShowInstruction(false)
    }
  }

  const dub1 = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/dubbing/space/start/start_1.mp3",
    )
    audio.play()
    const new_audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + `/music/SpeckInTime.mp3`,
    )
    new_audio.play()
    new_audio.loop = true
    setSubtitle("정신이 드십니까?")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setContainerOpacity(0)
      setSubtitle(null)
    }, 4000)
  }

  const dub2 = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/dubbing/space/start/start_2.mp3",
    )
    audio.play()
    setSubtitle("몸을 움직이실 수 있습니까?")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle(null)
    }, 4000)
  }

  const dub3 = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/dubbing/space/start/start_3.mp3",
    )
    audio.play()
    setSubtitle("좋습니다. 몸을 움직이는 데는 이상이 없으시군요.")
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle(null)
    }, 4000)
  }

  const dub4 = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/dubbing/space/start/start_4.mp3",
    )
    audio.play()
    setSubtitle("현재 산소공급 장치가 고장나 의식을 잃은 상태셨습니다.")
    setTimeout(() => {
      setSubtitle("산소가 완전히 고갈될 때까지 약 10분 남았습니다")
    }, 4000)
    setTimeout(() => {
      setSequence((n) => n + 1)
      setSubtitle(null)
    }, 8000)
  }

  const dub5 = () => {
    const audio = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + "/dubbing/space/start/start_5.mp3",
    )
    audio.play()
    setSubtitle("최대한 빨리 우주선을 탈출하세요.")
    setTimeout(() => {
      setSubtitle("AI 관제사로서 제가 탈출을 도와드리겠습니다.")
    }, 3000)
    setTimeout(() => {
      setSubtitle("먼저 조종실의 위치를 찾으세요.")
    }, 6000)
    setTimeout(() => {
      setSubtitle(null)
    }, 9000)
    setTimeout(() => {
      const audio = new Audio(
        process.env.NEXT_PUBLIC_IMAGE_URL +
          "/dubbing/space/sequence/server_key.mp3",
      )
      audio.play()
      setSubtitle("서버실에서 키 모양의 물체가 감지되었습니다.")
    }, 12000)
    setTimeout(() => {
      setSubtitle(null)
    }, 14000)
    setOnAir(false)
    // setIsNull(true)
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
