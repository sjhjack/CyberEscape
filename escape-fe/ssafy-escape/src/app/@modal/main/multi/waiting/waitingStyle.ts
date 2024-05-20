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
export const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 0;
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
export const ReadyImage = styled.img`
  position: absolute;
  top: 35%;
  width: 180px;
  height: 120px;
  pointer-events: none; // Ensures that the overlay does not interfere with mouse events
`
export const QuitButton = styled.button`
  position: absolute;
  top: 53%;
  width: 80px;
  height: 30px;
  background-color: #ff0000;
  border: none;
  border-radius: 10%;
  color: white;
  cursor: pointer;
`
