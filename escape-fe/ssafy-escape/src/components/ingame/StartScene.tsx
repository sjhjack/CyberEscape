import React, { useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
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
`

const Instructions = styled.div`
  text-align: center;
`

const HorrorWarning = styled.h2`
  color: red;
  font-size: 20px;
`

interface StartSceneProps {
  onFinish: () => void
  selectedTheme: number | null
}

const StartScene = ({ onFinish, selectedTheme }: StartSceneProps) => {
  useEffect(() => {
    setTimeout(() => {
      onFinish()
    }, 3000)
  })

  return (
    <Container>
      <Instructions>
        <h1>즐거운 게임 경험을 위해 소리를 켜주세요.</h1>
        {selectedTheme === 1 || selectedTheme === 2 || selectedTheme === 3 ? (
          <HorrorWarning>
            경고: 본 게임에는 공포 요소가 다수 포함되어 있으니 민감하신 분들은
            플레이에 주의하시길 바랍니다.
          </HorrorWarning>
        ) : null}
      </Instructions>
    </Container>
  )
}

export default StartScene
