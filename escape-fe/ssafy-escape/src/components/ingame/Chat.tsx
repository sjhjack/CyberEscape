import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

interface ChatProps {
  sendMessage: (text: string) => void
  chatting: chatData[]
}

const Chat = ({ sendMessage, chatting }: ChatProps) => {
  const userInputRef = useRef<HTMLInputElement>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const handleClickInsideChat = (event: MouseEvent) => {
  //     event.stopPropagation()
  //   }

  //   const chatContainer = document.getElementById(
  //     "chat-container",
  //   ) as HTMLElement
  //   chatContainer.addEventListener("click", handleClickInsideChat)

  //   return () => {
  //     chatContainer.removeEventListener("click", handleClickInsideChat)
  //   }
  // }, [])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatting])

  const send = () => {
    if (userInputRef.current) {
      const messageText = userInputRef.current.value.trim()
      if (messageText !== "") {
        sendMessage(messageText)
        userInputRef.current.value = ""
      }
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      send()
    }
  }
  return (
    <ChatContainer id="chat-container">
      <ChatBox ref={chatBoxRef}>
        {chatting.map((message, index) => (
          <div key={index}>
            <strong>{message.userName}:</strong> {message.message}
          </div>
        ))}
      </ChatBox>
      <ChatInput>
        <UserInput ref={userInputRef} onKeyDown={handleKeyDown} />
        <KeyboardReturnIcon onClick={send}></KeyboardReturnIcon>
      </ChatInput>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 250px;
  width: 230px;
  border: 1px solid #ccc;
  border-radius: 5%;
  padding: 10px;
  background-color: #000000;
  z-index: 100;
  padding-bottom: 20px;
  opacity: 80%;
`

const ChatBox = styled.div`
  height: 200px;
  border: 1px solid #eeeded;
  padding: 10px;
  margin-bottom: 8px;
  color: white;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const UserInput = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 3%;
`

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
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
export default Chat
