import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = (env.VITE_PERPLEXITY_API_KEY || '').trim()
  return {
    plugins: [
      react(),
      {
        name: 'perplexity-proxy',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const path = req.url?.split('?')[0]
            if (req.method === 'POST' && path === '/api/chat/completions') {
              let body = ''
              req.on('data', (chunk) => { body += chunk })
              req.on('end', () => {
                if (!apiKey) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Manca VITE_PERPLEXITY_API_KEY in .env' }))
                  return
                }
                fetch('https://api.perplexity.ai/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                  },
                  body
                })
                  .then((r) => r.text().then((text) => ({ status: r.status, text })))
                  .then(({ status, text }) => {
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = status
                    res.end(text)
                  })
                  .catch((e) => {
                    console.error('[perplexity-proxy]', e.message)
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ error: e.message }))
                  })
              })
              return
            }
            next()
          })
        }
      }
    ]
  }
})
