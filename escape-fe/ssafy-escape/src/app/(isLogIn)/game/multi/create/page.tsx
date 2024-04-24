"use client"
import Container from "@/components/common/Container"
import Input from "@/components/common/Input"
import ThemeCarousel from "@/components/common/ThemeCarousel"
import Button from "@/components/common/Button"
import Checkbox from "@mui/material/Checkbox"
import * as S from "./createStyle"
import { useState, useEffect } from "react"
const Page = () => {
  const [theme, selectTheme] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [secretMode, setSecretMode] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const handleSecretMode = (secretMode: boolean): void => {
    setSecretMode(!secretMode)
  }
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  return (
    <Container>
      <S.Contain>
        <S.CreateContainer>
          <S.MenuBox>
            <S.Menu>방 제목</S.Menu>
            <Input width="250px" onChange={handleTitle} />
          </S.MenuBox>
          <S.CarouselBox>
            <S.Menu>테마</S.Menu>
            <ThemeCarousel selectTheme={selectTheme} />
          </S.CarouselBox>
          <S.MenuBox>
            <S.Menu>비공개</S.Menu>
            <Checkbox
              checked={secretMode}
              onChange={() => {
                handleSecretMode(secretMode)
              }}
            />
          </S.MenuBox>
          {secretMode && (
            <S.MenuBox>
              <S.Menu>비밀번호</S.Menu>
              <Input width="250px" onChange={handlePassword} />
            </S.MenuBox>
          )}
        </S.CreateContainer>
      </S.Contain>
      <S.ButtonPlaced>
        <Button theme="success" text="방 만들기" width="200" />
      </S.ButtonPlaced>
    </Container>
  )
}

export default Page
