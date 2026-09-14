import React from 'react'
import './ChatMessage.css'

const ChatMessage = ({message}) =>{
  const isBot = message.user === 'gpt'

  return(

  <div className={`chat-message ${isBot ? 'chatgpt' : ''} ${message.error ? 'error' : ''}`}>

    <div className='chat-message-center'>

      <div className={`avatar ${isBot ? 'chatgpt' : ''}`}>
        {isBot ? 'IA' : 'Eu'}
      </div>

      <div className='message'>
        {message.message}
      </div>

    </div>
  </div>
  )
}

export default ChatMessage
