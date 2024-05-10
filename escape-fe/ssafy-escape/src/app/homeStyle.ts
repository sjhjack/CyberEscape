import { MainColor } from "@/styles/palette"
import { styled } from "styled-components"

export const TitleText = styled.div`
  font-size: 110px;
  color: ${MainColor};
  position: absolute;
  top: 40%;
  left: 50%;
  font-weight: bold;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`

export const StartButtton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-top: 50px;
  /* transition: transform 0.3s ease; */
  transition: font-size 0.3s ease;
  &:hover {
    /* transform: translate(-50%, -50%) scale(1.1); */
    font-size: 66px;
  }
`
