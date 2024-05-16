import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"

interface Message {
  sender: string
  text: string
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const userInputRef = useRef<HTMLInputElement>(null)
  const chatBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickInsideChat = (event: MouseEvent) => {
      event.stopPropagation()
    }

    const chatContainer = document.getElementById(
      "chat-container",
    ) as HTMLElement
    chatContainer.addEventListener("click", handleClickInsideChat)

    return () => {
      chatContainer.removeEventListener("click", handleClickInsideChat)
    }
  }, [])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (userInputRef.current) {
      const messageText = userInputRef.current.value.trim()
      if (messageText !== "") {
        const newMessage: Message = {
          sender: "나",
          text: messageText,
        }
        setMessages([...messages, newMessage])
        userInputRef.current.value = ""
      }
    }
  }

  return (
    <ChatContainer id="chat-container">
      <ChatBox ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </ChatBox>
      <UserInput ref={userInputRef} placeholder="채팅을 입력하세요" />
      <SendButton onClick={sendMessage}>전송</SendButton>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 250px;
  width: 330px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: gray;
  z-index: 100;
  padding-bottom: 20px;
`

const ChatBox = styled.div`
  height: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`

const UserInput = styled.input`
  width: calc(98% - 60px);
  padding: 5px;
`

const SendButton = styled.button`
  width: 50px;
  padding: 5px;
`

export default Chat
