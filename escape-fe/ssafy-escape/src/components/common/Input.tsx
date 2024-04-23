"use client"
import styled from "styled-components"

interface InputProps {
  placeholder: string
  type?: string
  width?: string
}

interface InputStyleProps {
  width?: string
}

const Input = ({ type, placeholder, width }: InputProps) => {
  return <InputStyle type={type} placeholder={placeholder} width={width} />
}

export default Input

const InputStyle = styled.input<InputStyleProps>`
  width: ${(props) => props.width || "200px"};
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  text-indent: 5px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #69b398;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(88, 174, 114, 0.25);
  }

  &:hover {
    border-color: #87cdb3;
  }
`
