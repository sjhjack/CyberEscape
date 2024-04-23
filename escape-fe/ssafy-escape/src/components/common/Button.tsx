"use client"
import {
  MainColor,
  MainColorDarker,
  RedColor,
  RedColorDarker,
} from "@/styles/palette"
import styled from "styled-components"

// success: 메인색(녹색), fail: 서브색(적색)

interface ButtonProps {
  text: string
  theme: "success" | "fail"
  width?: string
  backgroundColor?: string
  type?: "button" | "submit"
  onClick?: () => void
}

interface ButtonStyleProps {
  theme: "success" | "fail"
  backgroundColor?: string
  width?: string
}

const Button = ({
  theme,
  width,
  backgroundColor,
  text,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyle
      theme={theme}
      width={width}
      backgroundColor={backgroundColor}
      type={type}
      onClick={onClick}
    >
      {text}
    </ButtonStyle>
  )
}

export default Button

const ButtonStyle = styled.button<ButtonStyleProps>`
  width: ${(props) => props.width || "100%"};
  padding: 10px;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.theme === "success"
      ? MainColor
      : props.theme === "fail"
        ? RedColor
        : props.backgroundColor};
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme === "success"
        ? MainColorDarker
        : props.theme === "fail"
          ? RedColorDarker
          : null};
  }

  &:focus {
    background-color: ${(props) =>
      props.theme === "success"
        ? MainColorDarker
        : props.theme === "fail"
          ? RedColorDarker
          : null};
    box-shadow: 0 0 0 0.2rem rgba(15, 15, 15, 0.25);
  }
`
