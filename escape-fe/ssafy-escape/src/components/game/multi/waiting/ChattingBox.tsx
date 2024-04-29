"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
interface ChatType {
  username: string
  message: string
}
const ChattingBox = ({ session }: any) => {
  const [chat, setChat] = useState<ChatType[]>([])
  const [text, setText] = useState<string>("")
  // 메시지 인풋 태그 값 최신화
  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setText(event.target.value)
  }

  // 세션이 연결된 참가자에게 메시지 보내기
  const sendMessage = () => {
    session
      .signal({
        data: text,
        to: [],
      })
      .then(() => {
        console.log("Message successfully sent")
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }
  const submitChat = () => {
    // sendMessage()
    setText("")
  }
  return (
    <MainContainer>
      <ChatBox>
        {chat?.map((data: ChatType, index: number) => {
          return (
            <ChatContent key={index}>
              {data.username}: {data.message}
            </ChatContent>
          )
        })}
      </ChatBox>
      <ChatInput>
        <input type="text" value={text} onChange={handleChangeInput} />
        <KeyboardReturnIcon onClick={submitChat} />
      </ChatInput>
    </MainContainer>
  )
}

export default ChattingBox

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 40%;
  width: 100%;
`
const ChatBox = styled.div`
  width: 100%;
  height: 85%;
  border-radius: 2px;
  background-color: #3b3a3a;
  opacity: 0.8;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ChatContent = styled.div`
  color: white;
  padding: 2%;
`
const ChatInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #d3d3d3;
  border-radius: 2px;
  width: 100%;
  height: 4vh;

  input {
    flex: 1;
    border: none;
    background-color: transparent;
    outline: none;
  }

  svg {
    margin-left: 8px;
    cursor: pointer;
  }
`
