import styled from "styled-components"
import Image from "next/image"
import "./style.css"
interface CardComponentProps {
  themeData: CardInfo
  width?: number
  height?: number
}

const ThemeCard = ({ themeData, width, height }: CardComponentProps) => {
  return (
    <Card>
      <ThemeImageContainer>
        <ThemeImage
          src={themeData.image}
          alt="테마 이미지"
          width={width}
          height={height}
          priority
        />
        <ImageText>
          <div>주제: {themeData.title}</div>
          <div>제한시간: {themeData.time}</div>
          <div>내용: {themeData.content}</div>
        </ImageText>
      </ThemeImageContainer>
    </Card>
  )
}

export default ThemeCard

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ThemeImageContainer = styled.div`
  position: relative;
`

const ThemeImage = styled(Image)`
  transition: transform 0.2s ease-in-out;
  border-radius: 20px;
  ${ThemeImageContainer}:hover & {
    filter: brightness(0.3);
  }
`

const ImageText = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${ThemeImageContainer}:hover & {
    opacity: 1;
  }
`
