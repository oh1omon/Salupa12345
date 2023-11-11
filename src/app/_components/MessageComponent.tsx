import React from 'react'

interface MessageProps {
  text: string
  timestamp: number
  isSent: boolean
}

const Message: React.FC<MessageProps> = ({ text, timestamp, isSent }) => {
  const messageClass = isSent ? "self-end" : "self-start";
  const iconClass = isSent ? "ml-1" : "mr-1";
  const iconSource = isSent ? "/icons/person.svg" : "/icons/question_mark.svg";

  return (
    <div className={`w-[fit-content] max-w-[80%] bg-light-gray text-black mb-2 p-2 rounded flex flex-row items-center ${messageClass}`}>
      {!isSent && <img src={iconSource} alt="Received Icon" className={iconClass} />}
      <p className="text-sm">{text}</p>
      {isSent && <img src={iconSource} alt="Sent Icon" className={iconClass} />}
    </div>
  );
};

export default Message
