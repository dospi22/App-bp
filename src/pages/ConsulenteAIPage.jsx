import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { chatWithPerplexity } from '../services/perplexity'

const CONSULENTE_SYSTEM_PROMPT = 'Sei il Consulente AI di BusinessPlan AI: una guida per la gestione e la creazione del progetto e del business plan. Rispondi in italiano in modo chiaro e pratico. Aiuta l\'utente a definire l\'idea, strutturare le sezioni del business plan, chiarire dubbi e suggerire passi concreti. Sei collegato al contesto del Business Plan dell\'utente.'

const ConsulenteAIPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const fromBusinessPlan = location.state?.fromBusinessPlan

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: fromBusinessPlan
        ? "Ciao! Sono il Consulente AI collegato al tuo Business Plan. Sono qui per guidarti nella gestione e nella creazione del progetto: posso aiutarti a chiarire le sezioni, suggerire contenuti o rispondere a dubbi. Come posso aiutarti?"
        : "Ciao! Sono il Consulente AI, la tua guida per la gestione e la creazione del progetto. Posso aiutarti a definire l'idea, strutturare il Business Plan e rispondere a domande su ogni sezione. Da dove vuoi iniziare?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    const nextId = messages.length + 2
    try {
      const allMessages = [...messages, userMessage]
      const text = await chatWithPerplexity(allMessages, CONSULENTE_SYSTEM_PROMPT)
      setMessages(prev => [...prev, { id: nextId, text, sender: 'ai', timestamp: new Date() }])
    } catch (err) {
      let msg = 'errore sconosciuto'
      if (typeof err?.message === 'string') msg = err.message
      else if (err?.message != null) msg = String(err.message)
      else if (typeof err?.error === 'string') msg = err.error
      else if (err?.error?.message) msg = String(err.error.message)
      else if (err?.error != null) msg = JSON.stringify(err.error)
      else if (typeof err === 'string') msg = err
      else if (err && typeof err.toString === 'function' && err.toString() !== '[object Object]') msg = err.toString()
      else if (err) msg = JSON.stringify(err)
      if (typeof msg !== 'string') msg = 'errore sconosciuto'
      console.error('[Consulente AI]', err)
      const text = `Errore: ${msg}. Controlla la chiave API in .env e riavvia "npm run dev". Se persiste, apri la console (F12) per i dettagli.`
      setMessages(prev => [...prev, { id: nextId, text, sender: 'ai', timestamp: new Date() }])
    } finally {
      setIsTyping(false)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-6 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/business-plan', { state: location.state })}
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna al Business Plan
          </button>
          {fromBusinessPlan && (
            <span className="text-xs text-teal-400 bg-teal-500/10 px-2 py-1 rounded-full border border-teal-500/30">
              Collegato al progetto
            </span>
          )}
        </div>

        <div className="rounded-2xl bg-[#0f1419] border border-slate-600/30 overflow-hidden flex flex-col min-h-[calc(100vh-220px)]">
          <div className="p-5 border-b border-slate-600/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Consulente AI</h2>
                <p className="text-sm text-slate-400">Guida per la gestione e la creazione del progetto</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-500">Online</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-teal-500/90 text-white'
                      : 'bg-slate-800/80 text-slate-100 border border-slate-600/30'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{formatTime(message.timestamp)}</span>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-slate-800/80 rounded-2xl px-4 py-3 border border-slate-600/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-5 border-t border-slate-600/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Scrivi un messaggio..."
                className="flex-1 px-4 py-3 bg-slate-800/80 border border-slate-600/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConsulenteAIPage
