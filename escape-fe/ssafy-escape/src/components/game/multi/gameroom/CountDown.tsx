import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Countdown: React.FC<{ onCountdownComplete: () => void }> = ({
  onCountdownComplete,
}) => {
  const [seconds, setSeconds] = useState<number>(5)

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timerId)
    } else {
      onCountdownComplete()
    }
  }, [seconds, onCountdownComplete])

  return (
    <Overlay>
      <GameStart>게임 시작</GameStart>
      <Seconds>{seconds}</Seconds>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  z-index: 1000;
  flex-direction: column;
`

const GameStart = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
  padding-bottom: 4%;
  color: #fff;
  font-size: 4em;
`

const Seconds = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
  color: #ae0000;
  font-size: 10em;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.5);
`
export default Countdown
