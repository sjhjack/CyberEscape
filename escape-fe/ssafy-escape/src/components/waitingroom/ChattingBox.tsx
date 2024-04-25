"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

const ChattingBox = () => {
  const [chat, setChat] = useState(["dd", "dd"])
  return (
    <MainContainer>
      <ChatBox>
        {chat?.map((data: string, index: number) => {
          return <ChatContent key={index}>{data}</ChatContent>
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
  border: 1px solid white;
  border-radius: 2px;
  width: 100%;
  height: 3vh;

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
