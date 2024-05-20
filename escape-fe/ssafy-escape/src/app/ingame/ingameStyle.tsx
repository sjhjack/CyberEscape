import styled from "styled-components"
import Image from "next/image"

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
`

export const CountdownBox = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 90px;
  color: white;
  z-index: 100;
`
export const AimIcon = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const LoadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: red;
  font-weight: bold;
`
