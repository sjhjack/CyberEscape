import styled from "styled-components"

const Crosshair = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 1000;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: white;
  }

  &::before {
    left: 10px;
    width: 2px;
    height: 100%;
  }

  &::after {
    left: 0;
    top: 10px;
    width: 100%;
    height: 2px;
  }
`

export default Crosshair
