import Error from 'next/error';
import React, { useEffect, useState } from 'react';
import { SessionState } from '~/types/game';
import { clientApi } from '../_trpc/client';
import Message from './MessageComponent';

interface Message {
  text: string,
  timestamp: number,
  isSent: boolean;
}

interface ChatComponentProps {
  onSessionStateChange: (stage: SessionState) => void
  onResponderChange: (isAi: boolean) => void
}

const ChatComponent = ({ onSessionStateChange, onResponderChange }: ChatComponentProps) => {
  const messageMutation = clientApi.game.generate.useMutation()
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (messages.length === 6) {
      setTimeout(() => {
        onSessionStateChange(SessionState.MAKE_GUESS)
      }, 3000)
    }
  }, [messages])

  const handleSubmit = async () => {
    if (message.trim() !== '') {
      const newMessage: Message = {
        text: message,
        timestamp: Date.now(),
        isSent: true,
      }

      onResponderChange(false)

      setMessages((prevMessages) => [...prevMessages, newMessage])
      setMessage('')

      const response = await messageMutation.mutateAsync(message)

      setIsLoading(true)

      if (!response) {
        throw new Error({statusCode: 500})
      }

      const newMessageResponse: Message = {
        text: response,
        timestamp: Date.now(),
        isSent: false,
      }

      const timeout = response.length * 0.01 * 1000 + 3000

      setTimeout(() => {
        setIsLoading(false)
        onResponderChange(true)
        setMessages((prevMessages) => [...prevMessages, newMessageResponse])
      }, timeout)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleSubmit()
    }
  }

  return (
    <div className="h-full w-full rounded-3xl bg-dark-gray p-5">
      {/* <div className='w-full bg-medium-gray rounded p-2'>
        <p className='text-md'>Rules are simple: You can ask 3 questions from your opponent, then you need to guess if it was a filthy robot or a fellow human.</p>
      </div> */}
      <div className="flex h-full w-full flex-col justify-between">
        <div className="h-[calc(100%-10rem)] overflow-y-auto p-2 flex flex-col">
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
            disabled={isLoading}
            type="text"
            placeholder="Type here"
            className="h-full w-full bg-transparent outline-none mr-2"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <div
            onClick={() => void handleSubmit()}
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
