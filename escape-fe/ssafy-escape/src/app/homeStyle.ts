import { MainColor } from "@/styles/palette"
import { styled } from "styled-components"

export const TitleText = styled.div`
  font-size: 60px;
  color: ${MainColor};
  position: absolute;
  top: 40%;
  left: 50%;
  font-weight: bold;
  transform: translate(-50%, -50%);
  white-space: nowrap;
`

export const StartButtton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
`
