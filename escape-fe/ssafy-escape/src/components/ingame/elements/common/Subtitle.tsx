import React from "react"
import styled from "styled-components"

const SubtitleContainer = styled.div`
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  z-index: 99999;
`

const Subtitle = ({ text }: any) => {
  return text ? <SubtitleContainer>{text}</SubtitleContainer> : null
}

export default Subtitle
