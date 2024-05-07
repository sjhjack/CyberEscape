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

interface StartSceneProps {
  onFinish: () => void
}

const StartScene = ({ onFinish }: StartSceneProps) => {
  useEffect(() => {
    setTimeout(() => {
      onFinish()
    }, 3000)
  })

  return (
    <Container>
      <Instructions>
        <h1>즐거운 게임 경험을 위해 소리를 켜주세요.</h1>
      </Instructions>
    </Container>
  )
}

export default StartScene
