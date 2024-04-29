import React, { useState, useEffect } from "react"
import styled from "styled-components"

const CountdownTimer = () => {
  const [time, setTime] = useState({
    minutes: 10,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { minutes, seconds } = prevTime

        seconds -= 1

        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }

        if (minutes < 0) {
          clearInterval(interval)
          return { minutes: 0, seconds: 0 }
        }

        return { minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <Container>
      <TimerDigit>{time.minutes.toString().padStart(2, "0")}</TimerDigit>:
      <TimerDigit>{time.seconds.toString().padStart(2, "0")}</TimerDigit>
    </Container>
  )
}

export default CountdownTimer

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
  font-size: 58px;
  color: white;
`

const TimerDigit = styled.span`
  font-weight: bold;
`
