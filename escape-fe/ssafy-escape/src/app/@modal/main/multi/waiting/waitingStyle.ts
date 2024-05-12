import styled from "styled-components"
import Image from "next/image"

export const UserBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 22%;
`

export const CharacterBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 28vh;
  background-color: #eaeaea;
  border-radius: 100%;
`
export const Nickname = styled.p`
  display: flex;
  justify-content: center;
`
export const MainBox = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const ThemeImage = styled(Image)`
  border-radius: 10%;
`

export const ProfileImage = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
  border-radius: 100%;
`
export const MainContentBox = styled.div`
  display: flex;
  justify-content: center;
`
export const ChattingContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 30%;
`

export const CharacterBoxContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
