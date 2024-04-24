"use client"
import styled from "styled-components"
import "./style.css"
import * as S from "../../app/game/theme/themeStyle"

const ThemeCard = ({ card }: any) => {
  return (
    <S.Card>
      <S.ThemeContainer>
        <S.ThemeImage src={card.image} alt="" width={200} height={250} />
        <div>주제: {card.title}</div>
        <div>제한시간: {card.time}</div>
        <div>내용: {card.content}</div>
      </S.ThemeContainer>
    </S.Card>
  )
}

export default ThemeCard
