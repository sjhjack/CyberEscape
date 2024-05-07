import styled from "styled-components"
import Image from "next/image"

// for merge request

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
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

// 임시 로딩 텍스트
export const LoadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
`
