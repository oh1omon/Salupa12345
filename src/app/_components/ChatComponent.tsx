import React, { useState } from 'react'
import Message from './MessageComponent'

interface Message {
  text: string,
  timestamp: number,
  isSent: boolean;
}

const ChatComponent: React.FC = () => {
  const initialMessages: Message[] = [
    {
      text: "Hello there!",
      timestamp: Date.now() - 3600000, // Example timestamp from an hour ago
      isSent: true,
    },
    {
      text: "Hi! How can I help you?",
      timestamp: Date.now() - 1800000, // Example timestamp from half an hour ago
      isSent: false,
    },
    {
      text: "I have a question about your services.",
      timestamp: Date.now() - 900000, // Example timestamp from 15 minutes ago
      isSent: true,
    },
    {
      text: "Sure, feel free to ask.",
      timestamp: Date.now() - 300000, // Example timestamp from 5 minutes ago
      isSent: false,
    },
  ];
    
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleSubmit = () => {
    if (message.trim() !== '') {
      const newMessage: Message = {
        text: message,
        timestamp: Date.now(),
        isSent: true,
      }

      setMessages((prevMessages) => [...prevMessages, newMessage])
      setMessage('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="h-full w-full rounded-3xl bg-dark-gray p-5">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="h-[calc(100%-3rem)] overflow-y-auto p-2 flex flex-col">
          {messages.map((msg) => (
            <Message
              key={msg.timestamp}
              text={msg.text}
              timestamp={msg.timestamp}
              isSent={msg.isSent}
            />
          ))}
        </div>
        <div className="flex h-10 w-full flex-row rounded-md bg-medium-gray px-2 ">
          <input
            type="text"
            placeholder="Type here"
            className="h-full w-full bg-transparent outline-none mr-2"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <div
            onClick={handleSubmit}
            className="h-7 w-7 p-1 cursor-pointer self-center rounded bg-medium-green transition-transform duration-300 hover:brightness-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-full h-full"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
