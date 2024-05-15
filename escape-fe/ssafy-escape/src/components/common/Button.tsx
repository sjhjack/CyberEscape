"use client"
import styled from "styled-components"
import {
  MainColor,
  MainColorDarker,
  RedColor,
  RedColorBrighter,
  RedColorDarker,
} from "@/styles/palette"

// success: 메인색(녹색), fail: 서브색(적색)

interface ButtonProps {
  text?: string
  theme: "success" | "fail" | "game"
  width?: string
  height?: string
  fontSize?: string
  backgroundColor?: string
  opacity?: string
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}

interface ButtonStyleProps {
  theme: "success" | "fail" | "game"
  backgroundColor?: string
  width?: string
  height?: string
  fontSize?: string
  opacity?: string
}

const Button = ({
  theme,
  width,
  height,
  backgroundColor,
  fontSize,
  text,
  opacity,
  type,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyle
      theme={theme}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      opacity={opacity}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </ButtonStyle>
  )
}

export default Button

const ButtonStyle = styled.button<ButtonStyleProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  font-size: ${(props) => props.fontSize};
  padding: 10px;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.theme === "success"
      ? MainColor
      : props.theme === "fail"
        ? RedColor
        : props.theme === "game"
          ? RedColorBrighter
          : props.backgroundColor};
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  opacity: ${(props) => props.opacity || "1"};

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
