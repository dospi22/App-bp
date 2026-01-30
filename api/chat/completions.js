/**
 * Serverless function Vercel: proxy per API Perplexity (evita CORS).
 * Imposta VITE_PERPLEXITY_API_KEY nelle variabili d'ambiente del progetto Vercel.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = (process.env.VITE_PERPLEXITY_API_KEY || '').trim()
  if (!apiKey) {
    res.status(500).json({ error: 'Manca VITE_PERPLEXITY_API_KEY nelle variabili d\'ambiente Vercel' })
    return
  }

  try {
    const r = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const text = await r.text()
    res.status(r.status).setHeader('Content-Type', 'application/json').send(text)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
