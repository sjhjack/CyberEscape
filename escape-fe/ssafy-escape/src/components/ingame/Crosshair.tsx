import Image from "next/image"
import styled from "styled-components"

interface CrosshairProp {
  interactNum: number
}

const Crosshair1 = styled.div`
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

const Crosshair2 = styled.image`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 1000;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);
`

const Crosshair = ({ interactNum }: CrosshairProp) => {
  const imageURL = "/image/selection.png"
  const imageURL_2 = "/image/open_door.png"

  return interactNum === 1 ? (
    <Crosshair1></Crosshair1>
  ) : interactNum === 2 ? (
    <Crosshair2>
      <Image src={imageURL} alt={"Crosshair"} width={50} height={50} />
    </Crosshair2>
  ) : (
    <Crosshair2>
      <Image src={imageURL_2} alt={"Crosshair"} width={50} height={50} />
    </Crosshair2>
  )
}

export default Crosshair
