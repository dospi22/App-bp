import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const HomePage = () => {
  const navigate = useNavigate()
  const [showComeFunziona, setShowComeFunziona] = useState(false)

  return (
    <div className="min-h-screen text-white flex flex-col relative">
      {/* Sfondo: globo su verde, adattato all'app (teal #0a0e1a) e buona qualità */}
      <div
        className="fixed inset-0 -z-10 bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url(/assets/home-background.png)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          imageRendering: 'auto'
        }}
      />
      {/* Overlay a gradiente: integra la foto con i colori dell'app e mantiene leggibilità */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden
        style={{
          background: 'linear-gradient(180deg, rgba(10,14,26,0.4) 0%, rgba(10,14,26,0.55) 50%, rgba(10,14,26,0.7) 100%)'
        }}
      />

      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 md:py-20 relative">
        <div className="max-w-2xl min-h-[calc(100vh-200px)] flex items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Dai forma alla tua{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Idea
              </span>
              {' '}in pochi minuti.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              La piattaforma intelligente che ti guida nella creazione di un Business Plan professionale. 
              Analisi oggettiva, consulenza esperta e validazione immediata.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button
                onClick={() => navigate('/chat')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/30 min-h-[52px] sm:flex-1 sm:min-w-[200px]"
              >
                Crea il tuo progetto ora
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setShowComeFunziona(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-base font-medium text-white bg-[#1e293b] hover:bg-[#334155] transition-all border border-slate-600/50 min-h-[52px] sm:flex-1 sm:min-w-[200px]"
              >
                Scopri di più
              </button>
              <button
                onClick={() => navigate('/progetti')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-base font-medium text-teal-300 hover:text-teal-200 bg-teal-500/10 hover:bg-teal-500/20 transition-all border border-teal-500/30 min-h-[52px] sm:flex-1 sm:min-w-[200px]"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                I miei progetti
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Finestra "Come funziona l'app" */}
      {showComeFunziona && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowComeFunziona(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="come-funziona-title"
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0f1419] border-2 border-teal-500/30 shadow-2xl shadow-teal-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-6 border-b border-slate-600/50 bg-[#0f1419]/95 backdrop-blur">
              <h2 id="come-funziona-title" className="text-xl font-bold text-white">
                Come funziona BusinessPlan AI
              </h2>
              <button
                onClick={() => setShowComeFunziona(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                aria-label="Chiudi"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6 text-slate-300">
              <p className="text-slate-200 leading-relaxed">
                BusinessPlan AI ti accompagna dalla tua idea fino al business plan pronto per bandi e investitori. Ecco i passi in modo semplice.
              </p>

              <section>
                <h3 className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">1</span>
                  Crea il tuo progetto (Chat AI)
                </h3>
                <p className="pl-9 text-sm leading-relaxed">
                  Clicca su &quot;Crea il tuo progetto ora&quot; e parla con l&apos;assistente AI. Descrivi la tua idea, rispondi alle domande e l&apos;AI ti guida a chiarire obiettivi, mercato e punti di forza. Puoi salvare la conversazione in qualsiasi momento con il pulsante &quot;Salva&quot;.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">2</span>
                  Business Plan in 14 sezioni
                </h3>
                <p className="pl-9 text-sm leading-relaxed">
                  Dalla Chat o dalla Home vai al <strong className="text-white">Business Plan</strong>. Trovi 14 sezioni (Executive Summary, descrizione azienda, analisi mercato, piano finanziario, ecc.). Compila ogni sezione con l&apos;aiuto dei suggerimenti; puoi salvare il lavoro e riprenderlo dopo.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">3</span>
                  I miei progetti
                </h3>
                <p className="pl-9 text-sm leading-relaxed">
                  Tutti i progetti che salvi (dalla Chat o dal Business Plan) compaiono in <strong className="text-white">I miei progetti</strong>. Puoi riaprirli, continuare a lavorarci o eliminarli. Così non perdi mai il lavoro anche se non finisci in un&apos;unica sessione.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">4</span>
                  Analisi critica
                </h3>
                <p className="pl-9 text-sm leading-relaxed">
                  Dalla pagina Business Plan apri <strong className="text-white">Analisi critica</strong>. L&apos;AI ti propone 5 domande scomode, 5 riflessioni critiche sul piano e una sintesi finale (max 150 parole). Serve a mettere in luce punti deboli e rischi a cui non avevi pensato, per migliorare il progetto prima di presentarlo.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">5</span>
                  Ricerca bandi
                </h3>
                <p className="pl-9 text-sm leading-relaxed">
                  In <strong className="text-white">Bandi</strong> cerchi opportunità di finanziamento (bandi pubblici e privati). Puoi filtrare per categoria e usare la barra di ricerca. Così trovi i bandi più adatti al tuo progetto e puoi candidarti con un business plan già pronto e rivisto.
                </p>
              </section>

              <p className="text-slate-400 text-sm pt-2 border-t border-slate-600/50">
                In sintesi: descrivi l&apos;idea in Chat → compila il Business Plan → salva quando vuoi → usa l&apos;Analisi critica per rafforzarlo → cerca i bandi e candidati.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-[#0a0e1a]/80 py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Sicuro & Privato</p>
                <p className="text-sm text-gray-400">I tuoi dati sono protetti</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Analisi Dati Reali</p>
                <p className="text-sm text-gray-400">Basata su dati di mercato</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">AI Expert 24/7</p>
                <p className="text-sm text-gray-400">Assistenza sempre disponibile</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
