import React from "react";

interface MessageProps {
  text: string;
  timestamp: number;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ text, timestamp, isSent }) => {
  const messageClass = isSent
    ? "self-end"
    : "self-start";

  return (
    <div className={`w-[fit-content] max-w-[80%] bg-light-gray text-black mb-2 p-2 rounded ${messageClass}`}>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Message;
