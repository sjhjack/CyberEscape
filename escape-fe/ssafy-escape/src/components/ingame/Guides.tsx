import React from "react"
import styled, { CSSProperties } from "styled-components"

interface GuidesProps {
  text: string
  textStyle?: CSSProperties
}

const GuideContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
`

const GuideText = styled.div<{ textStyle?: CSSProperties }>`
  font-size: ${(props) => props.textStyle?.fontSize || "16px"};
  font-family: ${(props) => props.textStyle?.fontFamily || "Arial, sans-serif"};
  font-weight: ${(props) => props.textStyle?.fontWeight || "normal"};
`

const Guides = ({ text, textStyle }: GuidesProps) => {
  return (
    <GuideContainer>
      <GuideText textStyle={textStyle}>{text}</GuideText>
    </GuideContainer>
  )
}

export default Guides
