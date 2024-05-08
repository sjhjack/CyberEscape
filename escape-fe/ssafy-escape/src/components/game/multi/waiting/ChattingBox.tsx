"use client"
import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

interface ChattingBoxProps {
  session: any
  chatData: ChatType[]
}
interface ChatType {
  userName: string
  message: string
}

const ChattingBox = ({ session, chatData }: ChattingBoxProps) => {
  const [text, setText] = useState<string>("")
  const chatBoxRef = useRef<HTMLDivElement>(null)

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
      })
      .then(() => {
        console.log("Message successfully sent")
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }

  const submitChat = () => {
    sendMessage()
    setText("")
  }

  // chatData가 변경될 때마다 스크롤을 하단으로 고정
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatData])

  return (
    <MainContainer>
      <ChatBox ref={chatBoxRef}>
        {chatData?.map((data: ChatType, index: number) => {
          return (
            <ChatContent key={index}>
              {data.userName}: {data.message}
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
