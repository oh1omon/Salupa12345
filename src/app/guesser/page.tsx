'use client'

import ChatComponent from "../_components/ChatComponent"

const Guesser = () => {
  return (
    <div className="w-screen h-screen p-5 flex flex-row">
      <div className="w-3/5">
        <h1>Animations</h1>
      </div>
      <div className="w-2/5 flex1-2">
        <ChatComponent />
      </div>
    </div>
  )
}

export default Guesser
