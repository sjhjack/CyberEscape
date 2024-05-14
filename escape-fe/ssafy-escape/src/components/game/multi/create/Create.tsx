"use client"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Container from "@/components/common/Container"
import Input from "@/components/common/Input"
import ThemeCarousel from "@/components/common/ThemeCarousel"
import Button from "@/components/common/Button"
import Checkbox from "@mui/material/Checkbox"
import * as S from "@/app/@modal/main/multi/create/createStyle"
import { useState, useEffect } from "react"
import useIngameThemeStore from "@/stores/IngameTheme"
import useUserStore from "@/stores/UserStore"
import postCreateRoom from "@/services/game/room/postCreateRoom"
interface postCreateRoomRequestProps {
  title: string
  themaId: number
  password: string
  hostUuid: string
}
const Create = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>("")
  const [secretMode, setSecretMode] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const { selectedTheme } = useIngameThemeStore()
  const { userUuid, setIsHost } = useUserStore()
  const handleSecretMode = (secretMode: boolean): void => {
    setSecretMode(!secretMode)
  }
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }
  const buttonDisabled = (): boolean => {
    return title.trim() === "" || (secretMode && password.trim() === "")
  }

  const data: postCreateRoomRequestProps = {
    title: title,
    themaId: selectedTheme ? selectedTheme : 1,
    password: password,
    hostUuid: userUuid ? userUuid : "",
  }
  const createRoom = async () => {
    if (buttonDisabled()) {
      Swal.fire({ icon: "error", text: "모든 항목을 채워주세요" })
      return
    }
    const response = await postCreateRoom(data)
    setIsHost(true)
    router.push(`waiting/${response.data.roomUuid}`)
  }
  return (
    <Container
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="column"
      backgroundColor="none"
    >
      <S.CreateContainer>
        <S.MenuBox>
          <S.Menu>방 제목</S.Menu>
          <Input $width="300px" onChange={handleTitle} />
        </S.MenuBox>
        <S.MenuBox>
          <S.ThemeMenu>테마</S.ThemeMenu>
          <ThemeCarousel
            width={300}
            height={220}
            navigation={true}
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
            <Input type="password" $width="300px" onChange={handlePassword} />
          </S.MenuBox>
        )}
      </S.CreateContainer>
      <S.ButtonPlaced onClick={createRoom}>
        <Button theme="success" text="방 생성" width="200px" />
      </S.ButtonPlaced>
    </Container>
  )
}

export default Create
