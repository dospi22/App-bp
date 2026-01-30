/**
 * Server per produzione: serve l'app e fa da proxy per l'API Perplexity (evita CORS).
 * Avvia con: node server.js
 * Richiede .env con VITE_PERPLEXITY_API_KEY
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Carica .env manualmente (Node non lo fa di default)
function loadEnv() {
  const path = join(__dirname, '.env')
  if (!existsSync(path)) return
  const content = readFileSync(path, 'utf8')
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*VITE_PERPLEXITY_API_KEY\s*=\s*(.+?)\s*$/)
    if (m) process.env.VITE_PERPLEXITY_API_KEY = m[1].replace(/^["']|["']$/g, '').trim()
  }
}
loadEnv()

const apiKey = process.env.VITE_PERPLEXITY_API_KEY || ''
const port = process.env.PORT || 3000

// Import dinamico di express (dipendenza opzionale per chi usa solo dev)
const express = await import('express').then((m) => m.default)
const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(express.static(join(__dirname, 'dist')))

app.post('/api/chat/completions', async (req, res) => {
  if (!apiKey.trim()) {
    return res.status(500).json({ error: 'Manca VITE_PERPLEXITY_API_KEY in .env' })
  }
  try {
    const r = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const text = await r.text()
    res.status(r.status).set('Content-Type', 'application/json').send(text)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`)
  if (!apiKey.trim()) console.warn('Attenzione: VITE_PERPLEXITY_API_KEY non impostata, la chat non funzionerà.')
})
