/**
 * Sessione chat corrente (localStorage).
 * Usata da ChatPage per non perdere la conversazione quando l'utente va su Business Plan e torna.
 */

const SESSION_KEY = 'businessplan_chat_session'

export function getChatSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const messages = parsed?.messages
    if (!Array.isArray(messages) || messages.length === 0) return null
    return {
      messages: messages.map((m) => ({
        ...m,
        timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
      }))
    }
  } catch {
    return null
  }
}

export function saveChatSession({ messages }) {
  try {
    if (!messages?.length) return
    const payload = {
      messages: messages.map((m) => ({
        ...m,
        timestamp: m.timestamp?.toISOString?.() ?? m.timestamp
      }))
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
  } catch (e) {
    console.warn('saveChatSession failed', e?.message)
  }
}
