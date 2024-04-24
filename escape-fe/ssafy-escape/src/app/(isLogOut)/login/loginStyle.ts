
import { MainColor } from "@/styles/palette"
import { styled } from "styled-components"

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`

export const MainText = styled.div`
  font-size: 35px;
  color: ${MainColor};
`

export const SubText = styled.div`
  font-size: 12px;
  color: ${MainColor};
`

export const BackIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`
