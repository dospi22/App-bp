import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { saveProject, getProject } from '../utils/projectStorage'
import { getChatSession, saveChatSession } from '../utils/chatSessionStorage'
import { chatWithPerplexity } from '../services/perplexity'
import { getBusinessPlanDraft, updateBusinessPlanDraft } from '../utils/businessPlanDraft'
import { buildBusinessPlanChatSystemPrompt, SEZIONE_REGEX } from '../services/businessPlanChatPrompt'
import { businessPlanSections } from '../data/businessPlanSections'

/** Sostituisce i blocchi [SEZIONE:...] nel messaggio con una riga breve, così la chat non si riempie di testo */
function shortenMessageForChat(text) {
  if (!text || typeof text !== 'string') return text
  const regex = /\[SEZIONE:\s*(\w+)\]\s*[\s\S]*?\[\/SEZIONE\]/gi
  const byId = Object.fromEntries(businessPlanSections.map(s => [s.id, s.title]))
  return text.replace(regex, (_, id) => {
    const title = byId[id] || id
    return `✓ ${title} compilata.`
  }).replace(/\n{3,}/g, '\n\n').trim()
}

const AUTOSAVE_PROJECT_KEY = 'businessplan_autosave_project_id'
const USER_MESSAGES_FOR_AUTOSAVE = 3

const DEFAULT_MESSAGE = {
  id: 1,
  text: "Ciao, sono il tuo consulente aziendale per il Business Plan. Ti intervisterò con le domande giuste per compilare insieme un piano completo, professionale e onesto. Iniziamo: qual è il nome dell'azienda o del progetto e in che settore opera?",
  sender: 'ai',
  timestamp: new Date()
}

const ChatPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [messages, setMessages] = useState([DEFAULT_MESSAGE])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [saveFeedback, setSaveFeedback] = useState(false)
  const [draftPreview, setDraftPreview] = useState(() => getBusinessPlanDraft())
  const [previewOpen, setPreviewOpen] = useState(true)
  const messagesEndRef = useRef(null)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  // Carica messaggi: da progetto salvato (se projectId) oppure dalla sessione corrente
  useEffect(() => {
    const projectId = location.state?.projectId
    let cancelled = false
    if (projectId) {
      getProject(projectId).then((project) => {
        if (cancelled) return
        if (project?.data?.messages?.length) {
          const msgs = project.data.messages.map(m => ({
            ...m,
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
          }))
          setMessages(msgs)
        }
      })
    } else {
      const session = getChatSession()
      if (session?.messages?.length) setMessages(session.messages)
    }
    setDraftPreview(getBusinessPlanDraft())
    return () => { cancelled = true }
  }, [location.state?.projectId])

  // Salva la sessione solo se c'è una conversazione (2+ messaggi).
  useEffect(() => {
    if (location.state?.projectId) return
    if (messages.length > 1) saveChatSession({ messages })
    return () => {
      const current = messagesRef.current
      if (current.length > 1) saveChatSession({ messages: current })
    }
  }, [messages, location.state?.projectId])

  // Auto-save in "I miei progetti" quando l'utente ha più di 3 risposte
  const userMessageCount = messages.filter(m => m.sender === 'user').length
  useEffect(() => {
    if (location.state?.projectId || userMessageCount <= USER_MESSAGES_FOR_AUTOSAVE) return
    const payload = {
      type: 'chat',
      name: `Chat in corso ${new Date().toLocaleDateString('it-IT')}`,
      data: { messages: messages.map(m => ({ ...m, timestamp: m.timestamp?.toISOString?.() || m.timestamp })) }
    }
    const savedId = sessionStorage.getItem(AUTOSAVE_PROJECT_KEY)
    if (savedId) payload.id = savedId
    let cancelled = false
    saveProject(payload).then((project) => {
      if (!cancelled && project?.id) sessionStorage.setItem(AUTOSAVE_PROJECT_KEY, project.id)
    })
    return () => { cancelled = true }
  }, [messages, location.state?.projectId, userMessageCount])

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
      const draft = getBusinessPlanDraft()
      const systemPrompt = buildBusinessPlanChatSystemPrompt(draft)
      const allMessages = [...messages, userMessage]
      const text = await chatWithPerplexity(allMessages, systemPrompt)
      const updates = {}
      let match
      SEZIONE_REGEX.lastIndex = 0
      while ((match = SEZIONE_REGEX.exec(text)) !== null) {
        const [, sectionId, content] = match
        if (sectionId && content) updates[sectionId] = content.trim()
      }
      if (Object.keys(updates).length > 0) {
        updateBusinessPlanDraft(updates)
        setDraftPreview(getBusinessPlanDraft())
      }
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
      console.error('[Chat AI]', err)
      const text = `Errore: ${msg}. Controlla la chiave API in .env e riavvia "npm run dev". Se persiste, apri la console (F12) per i dettagli.`
      setMessages(prev => [...prev, { id: nextId, text, sender: 'ai', timestamp: new Date() }])
    } finally {
      setIsTyping(false)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSave = async () => {
    const name = window.prompt('Nome del progetto (opzionale)', `Chat ${new Date().toLocaleDateString('it-IT')}`) || `Chat ${new Date().toLocaleDateString('it-IT')}`
    await saveProject({
      type: 'chat',
      name,
      data: {
        messages: messages.map(m => ({ ...m, timestamp: m.timestamp?.toISOString?.() || m.timestamp }))
      }
    })
    setSaveFeedback(true)
    setTimeout(() => setSaveFeedback(false), 3000)
  }

  // Tornando alla Home: salva la chat in "I miei progetti" così non si perde
  const handleGoHome = async () => {
    const projectId = location.state?.projectId
    if (!projectId && messages.length > 0) {
      const name = `Chat ${new Date().toLocaleDateString('it-IT')} ${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
      await saveProject({
        type: 'chat',
        name,
        data: {
          messages: messages.map(m => ({ ...m, timestamp: m.timestamp?.toISOString?.() || m.timestamp }))
        }
      })
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Torna alla Home
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">AI Online</span>
              </div>
              {saveFeedback && (
                <span className="text-sm text-teal-400 font-medium animate-pulse">Progetto salvato</span>
              )}
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full font-medium border border-teal-500/50 text-teal-300 hover:bg-teal-500/20 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Salva
              </button>
              <button
                onClick={() => navigate('/business-plan')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-teal-500/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Business Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat + Anteprima Business Plan */}
      <div className="flex-1 flex gap-4 px-4 py-6 max-w-7xl mx-auto w-full min-h-0">
        {/* Chat */}
        <div className="flex-1 min-w-0 flex flex-col max-w-2xl">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 h-full flex flex-col min-h-[400px]">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Assistente AI Business Plan</h2>
                <p className="text-sm text-gray-400">Ti faccio domande e compilo io il Business Plan</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.sender === 'ai' ? shortenMessageForChat(message.text) : message.text}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-6 border-t border-gray-700">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Scrivi un messaggio..."
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all shadow-lg shadow-teal-500/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        </div>

        {/* Anteprima Business Plan in tempo reale */}
        <aside className={`hidden lg:flex flex-col flex-shrink-0 transition-all ${previewOpen ? 'w-80' : 'w-12'}`}>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col min-h-[400px] overflow-hidden">
            <button
              type="button"
              onClick={() => setPreviewOpen(!previewOpen)}
              className="flex items-center justify-between p-3 border-b border-gray-700 text-left hover:bg-gray-800/50"
            >
              {previewOpen && <span className="text-sm font-semibold text-white">Anteprima Business Plan</span>}
              <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ${previewOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {previewOpen && (
            <div className="flex-1 overflow-y-auto p-3 text-sm">
              <div className="mb-3 text-xs text-teal-400 font-semibold">
                {Math.round((businessPlanSections.filter(s => draftPreview[s.id]?.trim()).length / businessPlanSections.length) * 100)}% completato
              </div>
              {businessPlanSections.map((section) => {
                const content = draftPreview[section.id]?.trim()
                return (
                  <div key={section.id} className="mb-4">
                    <div className="text-xs font-bold text-gray-300 border-b border-gray-600 pb-1 mb-1">{section.title}</div>
                    <div className="text-gray-400 whitespace-pre-wrap text-xs leading-relaxed max-h-24 overflow-y-auto">
                      {content || '— Non compilato —'}
                    </div>
                  </div>
                )
              })}
            </div>
            )}
            {previewOpen && (
            <div className="p-2 border-t border-gray-700">
              <button
                type="button"
                onClick={() => navigate('/business-plan')}
                className="w-full py-2 text-xs font-medium text-teal-400 hover:text-teal-300 border border-teal-500/50 rounded-lg"
              >
                Apri Business Plan completo
              </button>
            </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default ChatPage
