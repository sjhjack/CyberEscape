import styled from "styled-components"

interface InputProps {
  $width?: string
  $textIndent?: string
}

const Input = styled.input<InputProps>`
  width: ${(props) => props.$width || "200px"};
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  text-indent: ${(props) => props.$textIndent || "5px"};
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
export default Input
