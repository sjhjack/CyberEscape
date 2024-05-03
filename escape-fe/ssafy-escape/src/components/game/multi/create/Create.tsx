"use client"
import { useRouter } from "next/navigation"
import Container from "@/components/common/Container"
import Input from "@/components/common/Input"
import ThemeCarousel from "@/components/common/ThemeCarousel"
import Button from "@/components/common/Button"
import Checkbox from "@mui/material/Checkbox"
import * as S from "@/app/(isLogIn)/game/multi/create/createStyle"
import postCreateRoom from "@/services/game/room/postCreateRoom"
import useIngameThemeStore from "@/stores/IngameTheme"
import { useState, useEffect } from "react"
interface postCreateRoomRequestProps {
  title: string
  themaId: number
  password: string
  hostUuid: string
}
const themes: Array<string> = ["horror", "ssafy", "space"]
const Create = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>("")
  const [secretMode, setSecretMode] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const { selectedTheme } = useIngameThemeStore()
  const handleSecretMode = (secretMode: boolean): void => {
    setSecretMode(!secretMode)
  }
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }
  const hostUuid: string = ""
  const data: postCreateRoomRequestProps = {
    title: title,
    themaId: selectedTheme ? themes.indexOf(selectedTheme) : 1,
    password: password,
    hostUuid: hostUuid,
  }
  const createRoom = async () => {
    const response = await postCreateRoom(data)
    router.push(`waiting/${response.data.roomUuid}`)
  }
  return (
    <Container
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="column"
    >
      <S.CreateContainer>
        <S.MenuBox>
          <S.Menu>방 제목</S.Menu>
          <Input width="250px" onChange={handleTitle} />
        </S.MenuBox>
        <S.MenuBox>
          <S.Menu>
            <div>테마</div>
          </S.Menu>
          <ThemeCarousel
            width={300}
            height={220}
            navigation={false}
            pagination={true}
          />
        </S.MenuBox>
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
      <S.ButtonPlaced onClick={createRoom}>
        <Button theme="success" text="방 만들기" width="200" />
      </S.ButtonPlaced>
    </Container>
  )
}

export default Create
