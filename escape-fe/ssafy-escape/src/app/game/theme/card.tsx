"use client"
import styled from "styled-components"
import "./style.css"
const Card = styled.div`
width: 30vw  
height: 15vh  
border-radius: 5px;
background-color: white
display:flex
text-align: center
line-height:300px
`
const CardComponent = ({ card }: any) => {
  return (
    <Card>
      <div className="theme-container">
        <img className="theme-image" src={card.image} />
        <div>주제: {card.title}</div>
        <div>제한시간: {card.time}</div>
        <div>내용: {card.content}</div>
      </div>
    </Card>
  )
}

export default CardComponent
