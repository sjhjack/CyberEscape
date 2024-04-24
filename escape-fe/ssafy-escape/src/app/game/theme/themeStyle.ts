import Image from "next/image"
import styled from "styled-components"
export const MainContainer = styled.div`
  margin-top: 3%;
  width: 90%;
`
export const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 3%;
`
export const ThemeImage = styled(Image)`
  border-radius: 20px;
  width: 30vw;
  height: 35vh;
  margin-bottom: 3%;
`
export const Card = styled.div`
  border-radius: 5px;
  background-color: white;
  display: flex;
  text-align: center;
`
