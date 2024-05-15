import { styled } from "styled-components"

interface BloodTextProps {
  role: "experiment" | "scientist"
  penalty: number
}

const BloodText = ({ role }: BloodTextProps) => {
  const messages = new Array(350).fill(
    role === "experiment" ? "살려줘" : "죽어",
  )
  const getRandomFontSize = () => {
    return Math.floor(Math.random() * 45) + 20 // 20px ~ 64px 사이의 랜덤 크기
  }
  return (
    <Container>
      {messages.map((message, index) => (
        <Message key={index} fontSize={getRandomFontSize()}>
          {message}
        </Message>
      ))}
    </Container>
  )
}

export default BloodText

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  word-break: break-all;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const Message = styled.div<{ fontSize: number }>`
  color: red;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  white-space: nowrap;
  font-weight: bold;
  z-index: 1001;
`
