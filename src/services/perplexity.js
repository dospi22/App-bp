/**
 * Chiamata all'API Perplexity Chat Completions.
 * In dev e in produzione la richiesta passa dal proxy (/api/chat/completions) per evitare CORS;
 * la chiave API va in .env come VITE_PERPLEXITY_API_KEY (sul server, non esposta al browser).
 */

const API_URL = '/api/chat/completions'
const MODEL = 'sonar'

/**
 * Invia i messaggi a Perplexity e restituisce la risposta testuale.
 * @param {Array<{ sender: string, text: string }>} messages
 * @param {string} [systemPrompt] - Prompt di sistema opzionale
 * @returns {Promise<string>} Testo della risposta AI
 */
export async function chatWithPerplexity(messages, systemPrompt = null) {
  const bodyMessages = []
  if (systemPrompt && String(systemPrompt).trim()) {
    bodyMessages.push({ role: 'system', content: String(systemPrompt).trim() })
  }
  for (const m of messages) {
    const content = m.text != null ? String(m.text).trim() : ''
    if (!content) continue
    const role = m.sender === 'user' ? 'user' : 'assistant'
    // Perplexity richiede: dopo system, user e assistant devono alternarsi (primo messaggio = user)
    const lastRole = bodyMessages.length > 0 ? bodyMessages[bodyMessages.length - 1].role : null
    if (lastRole === 'system' && role === 'assistant') {
      bodyMessages.push({ role: 'user', content: 'Inizia la conversazione.' })
    }
    bodyMessages.push({ role, content })
  }
  if (bodyMessages.filter(m => m.role !== 'system').length === 0) throw new Error('Nessun messaggio da inviare')

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: bodyMessages,
      max_tokens: 1024,
      temperature: 0.2
    })
  })

  const text = await res.text()
  if (!res.ok) {
    let msg = `API ${res.status}`
    try {
      const j = JSON.parse(text)
      const err = j.error
      if (typeof err === 'string') msg = err
      else if (err && typeof err.message === 'string') msg = err.message
      else if (err) msg = JSON.stringify(err)
      else if (typeof j.message === 'string') msg = j.message
    } catch (_) {
      if (text) msg = text.slice(0, 300)
    }
    throw new Error(msg)
  }

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Risposta non valida dal server')
  }
  const content = data?.choices?.[0]?.message?.content
  if (content == null) {
    throw new Error('Risposta senza contenuto')
  }
  return content
}
