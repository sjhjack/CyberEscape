import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Arial, sans-serif;
`

const Instructions = styled.div`
  text-align: center;
`

const StartScene = () => {
  return (
    <Container>
      <Instructions>
        <h1>즐거운 게임 경험을 위해 소리를 켜주세요.</h1>
        <p>Click to start</p>
      </Instructions>
    </Container>
  )
}

export default StartScene
