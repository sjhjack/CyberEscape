"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
interface ChatType {
  username: string
  message: string
}
const ChattingBox = () => {
  const [chat, setChat] = useState([
    { username: "ilgoo", message: "hi" },
    { username: "heejoo", message: "hi" },
    { username: "ilgoo", message: "hi" },
  ])
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
        <input type="text" />
        <KeyboardReturnIcon />
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
