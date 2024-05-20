import styled from "styled-components"
import Image from "next/image"
export const Title = styled.h1`
  text-align: center;
  margin: 0;
`
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-around;
`
export const MultiImage = styled(Image)`
  border-radius: 20px;
`
export const MenuText = styled.h3`
  font-weight: bold;
  text-align: center;
`
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
