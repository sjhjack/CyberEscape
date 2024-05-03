import React, { useEffect, useState } from "react"
import styled from "styled-components"

interface CountdownProps {
  isModelLoaded: boolean
  onFinish: () => void
}

const StartingCountDown = ({ isModelLoaded, onFinish }: CountdownProps) => {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isModelLoaded && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1)
      }, 1000)
    } else if (countdown === 0) {
      onFinish()
    }
    return () => clearInterval(intervalId)
  }, [isModelLoaded, countdown, onFinish])

  return countdown > 0 ? <CountDiv>{countdown}</CountDiv> : null
}

const CountDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px;
  z-index: 100;
`

export default StartingCountDown
