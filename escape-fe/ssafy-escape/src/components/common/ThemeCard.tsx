"use client"
import styled from "styled-components"
import Image from "next/image"
import "./style.css"
interface CardComponentProps {
  themeData: CardInfo
}
interface CardStyleProps {
  $width?: string
  $height?: string
}
const ThemeCard = ({ themeData }: CardComponentProps) => {
  return (
    <Card>
      <ThemeImage
        src={themeData.image}
        alt="테마 이미지"
        width={400}
        height={300}
        priority
      />
      <InfoOverlay>
        <div>주제: {themeData.title}</div>
        <div>제한시간: {themeData.time}</div>
        <div>내용: {themeData.content}</div>
      </InfoOverlay>
    </Card>
  )
}

export default ThemeCard

const Card = styled.div<CardStyleProps>`
  border-radius: 5px;
  background-color: #cecece;
  display: flex;
  justify-content: center;
  text-align: center;
  width: ${(props) => props.$width || "35vw"};
  height: ${(props) => props.$height || "60vh"};
  overflow: hidden; /* 내부 요소의 넘치는 부분을 숨김 */
`

const ThemeImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지를 부모 요소에 맞게 조정 */
`

const InfoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: opacity 0.3s;

  ${ThemeImage}:hover + & {
    opacity: 1;
  }
`
