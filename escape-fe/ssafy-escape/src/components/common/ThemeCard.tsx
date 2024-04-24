"use client"
import styled from "styled-components"
import Image from "next/image"
import "./style.css"
interface CardComponentProps {
  themeData: CardInfo
}

const ThemeCard = ({ themeData }: CardComponentProps) => {
  return (
    <Card>
      <ThemeContainer>
        <ThemeImage src={themeData.image} alt="" width={300} height={250} />
        <InfoOverlay>
          <div>주제: {themeData.title}</div>
          <div>제한시간: {themeData.time}</div>
          <div>내용: {themeData.content}</div>
        </InfoOverlay>
      </ThemeContainer>
    </Card>
  )
}

export default ThemeCard

const Card = styled.div`
  border-radius: 5px;
  background-color: white;
  display: flex;
  text-align: center;
`

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 3%;
  position: relative;
  cursor: pointer;
`

const ThemeImage = styled(Image)`
  transition: opacity 0.3s;
  opacity: 1;
  width: 300px;
  height: 250px;
  border-radius: 20px;
  margin-bottom: 3%;

  ${ThemeContainer}:hover & {
    opacity: 0.5;
  }
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
