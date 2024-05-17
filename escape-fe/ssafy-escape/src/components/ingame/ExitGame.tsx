import React, { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

// for merge request

const ExitGame = ({ href, children }: any) => {
  //   const router = useRouter()

  // useEffect(() => {
  //   const handleClickInsideButton = (event: MouseEvent) => {
  //     event.stopPropagation()
  //   }

  //   const ButtonContainer = document.getElementById(
  //     "button-container",
  //   ) as HTMLElement
  //   ButtonContainer.addEventListener("click", handleClickInsideButton)

  //   return () => {
  //     ButtonContainer.removeEventListener("click", handleClickInsideButton)
  //   }
  // }, [])

  return <Button id="button-container">{children}</Button>
}

export default ExitGame

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
  background: none;
  border: none;
  cursor: pointer;
`
