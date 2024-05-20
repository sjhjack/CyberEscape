import React, {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
} from "react"
import styled from "styled-components"

export interface CountdownTimerHandle {
  applyPenalty: () => void
  getTime: () => { minutes: number; seconds: number }
}

interface CountdownTimerProps {
  onTimeOut: () => void
  color: string
  minutes?: number
}

const CountdownTimer: ForwardRefRenderFunction<
  CountdownTimerHandle,
  CountdownTimerProps
> = ({ onTimeOut, color, minutes }: CountdownTimerProps, ref) => {
  const [time, setTime] = useState({
    minutes: minutes || 10,
    seconds: 0,
  })

  const applyPenalty = useCallback(() => {
    setTime((prevTime) => {
      let { minutes, seconds } = prevTime
      const totalSeconds = minutes * 60 + seconds
      const newTotalSeconds = Math.max(totalSeconds - 30, 0)

      const newMinutes = Math.floor(newTotalSeconds / 60)
      const newSeconds = newTotalSeconds % 60

      return { minutes: newMinutes, seconds: newSeconds }
    })
  }, [])

  useImperativeHandle(ref, () => ({
    applyPenalty,
    getTime: () => time,
  }))
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { minutes, seconds } = prevTime

        seconds -= 1

        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }

        if (minutes < 0 || (minutes === 0 && seconds === 0)) {
          clearInterval(interval)
          onTimeOut()
          return { minutes: 0, seconds: 0 }
        }

        return { minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onTimeOut])
  return (
    <Container color={color}>
      <TimerDigit>{time.minutes.toString().padStart(2, "0")}</TimerDigit>:
      <TimerDigit>{time.seconds.toString().padStart(2, "0")}</TimerDigit>
    </Container>
  )
}

export default forwardRef(CountdownTimer)

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
  font-size: 58px;
  color: ${(props) => props.color};
  z-index: 99;
  text-shadow:
    2px 2px 0px black,
    -2px -2px 0px black,
    2px -2px 0px black,
    -2px 2px 0px black;
`

const TimerDigit = styled.span`
  font-weight: bold;
`
