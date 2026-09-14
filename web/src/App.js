import './App.css';
import './styles/reset.css';
import { useEffect, useRef, useState } from 'react';

import {makeRequest} from './api/api'
import SideMenu from './components/SideMenu/Sidemenu'
import ChatMessage from './components/ChatMessage/ChatMessage'

const INITIAL_CHAT = [{
  user: "gpt",
  message:"Como posso te ajudar hoje?"
}]

function App() {

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatLog, setChatLog] = useState(INITIAL_CHAT)
  const chatEndRef = useRef(null)
  const chatIdRef = useRef(0)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLog, loading])

  function handleNewChat() {
    chatIdRef.current += 1
    setChatLog(INITIAL_CHAT)
    setInput("")
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const prompt = input.trim()
    if (!prompt || loading) return

    const chatId = chatIdRef.current
    setChatLog(log => [...log, { user: 'me', message: prompt }])
    setInput("")
    setLoading(true)

    try {
      const response = await makeRequest({prompt})
      if (chatId !== chatIdRef.current) return

      if (!response.sucess || !response.data) {
        throw new Error(errorMessage(response.error))
      }

      const lines = response.data.split('\n')
        .map((line, index) => <p key={index}>{line}</p>);

      setChatLog(log => [...log, { user: 'gpt', message: lines }])
    } catch (error) {
      if (chatId !== chatIdRef.current) return
      const message = error.response
        ? errorMessage(error.response.data?.error)
        : error.request
          ? 'Não foi possível conectar ao servidor.'
          : error.message

      setChatLog(log => [...log, { user: 'gpt', error: true, message: `Erro: ${message}` }])
    } finally {
      if (chatId === chatIdRef.current) setLoading(false)
    }
  }

  return (
    <div className='App'>

      <SideMenu onNewChat={handleNewChat} />

      <section className='chatbox'>

          <div className='chat-log'>
            {chatLog.map((message, index)=>(
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <ChatMessage message={{ user: 'gpt', message: 'Aguardando resposta...' }} />
            )}
            <div ref={chatEndRef} />
          </div>

          <div className='chat-input-holder'>
            <form className='chat-input-form' onSubmit={handleSubmit}>
              <input
                className='chat-input-textarea'
                placeholder='Digite sua mensagem...'
                value={input}
                disabled={loading}
                onChange={e =>setInput(e.target.value)}
              />
              <button
                type='submit'
                className='chat-send-button'
                disabled={loading || !input.trim()}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
      </section>

    </div>
  );
}

function errorMessage(error) {
  if (!error) return 'Nenhuma resposta recebida do modelo.'
  if (typeof error === 'string') return error
  return error.message || 'Nenhuma resposta recebida do modelo.'
}

export default App;
