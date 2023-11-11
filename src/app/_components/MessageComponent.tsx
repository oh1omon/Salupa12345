import React, { useEffect, useState } from 'react'

interface MessageProps {
  text: string
  timestamp: number
  isSent: boolean
}

const Message: React.FC<MessageProps> = ({ text, timestamp, isSent }) => {
  const messageClass = isSent ? 'self-end' : 'self-start'
  const iconClass = isSent ? 'ml-1' : 'mr-1'
  const iconSource = isSent ? '/icons/person.svg' : '/icons/question_mark.svg'

  // gradually fade out the message after 10 seconds
  const [opacity, setOpacity] = useState(1.0)
  useEffect(() => {
    let timerInterval = setInterval(() => {
      setOpacity((opacity) => {
        if (opacity <= 0) {
          clearInterval(timerInterval)
        }
        return Math.max(opacity - 0.001, 0)
      })
    }, 100)
    
    return () => clearInterval(timerInterval)
  }, [])

  return (
    <div
      className={`mb-2 flex w-[fit-content] max-w-[80%] flex-row items-center rounded bg-light-gray p-2 text-black ${messageClass}`}
      style={{ opacity: opacity }}
    >
      {!isSent && (
        <img src={iconSource} alt="Received Icon" className={iconClass} />
      )}
      <p className="text-sm">{text}</p>
      {isSent && <img src={iconSource} alt="Sent Icon" className={iconClass} />}
    </div>
  )
}

export default Message
