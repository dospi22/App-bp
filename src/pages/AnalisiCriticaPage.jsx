import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const MAX_PAROLE_RIFLESSIONE = 150

const AnalisiCriticaPage = () => {
  const navigate = useNavigate()

  // Placeholder: 5 domande scomode e critiche dall'AI (da sostituire con output AI reale)
  const domandeScomode = [
    'Cosa succede al tuo progetto se il tuo principale cliente o partner va in crisi o ti abbandona? Hai un piano B?',
    'Perché un investitore dovrebbe scegliere proprio te invece di un competitor con più esperienza e più capitale?',
    'Hai calcolato davvero tutti i costi nascosti (assicurazioni, legali, ritardi, inflazione) o stai sottostimando?',
    'Quali sono le tre obiezioni più forti che un banchiere o un investitore ti farebbe e come risponderesti?',
    'Se il mercato si contrae o cambia regolamentazione in 12 mesi, il tuo business plan regge ancora?'
  ]

  // Placeholder: 5 riflessioni critiche sull'progetto (da sostituire con output AI reale)
  const riflessioniCritiche = [
    'Il piano finanziario sembra ottimistico: le ipotesi di crescita sono spesso irrealistiche nel primo anno. Serve un scenario conservativo.',
    'La differenziazione rispetto ai concorrenti non emerge in modo chiaro; senza un vantaggio sostenibile il mercato è difficile da conquistare.',
    'Mancano evidenze concrete sulla domanda (survey, lettere di intenti, pre-vendite). Le idee non bastano senza validazione.',
    'I rischi sono elencati ma non mitigati: ogni rischio dovrebbe avere una strategia di contenimento esplicita.',
    'La squadra e le competenze critiche non sono sufficientemente dettagliate; gli investitori puntano sulle persone.'
  ]

  // Placeholder: riflessione finale (max 150 parole - da sostituire con output AI reale)
  const riflessioneFinale = `L'analisi del progetto evidenzia punti di forza ma anche falle importanti: la sostenibilità finanziaria nel medio periodo è incerta, la proposta di valore va resa più chiara e la gestione del rischio va strutturata. Senza un piano B e senza dati di mercato solidi, l'idea rischia di restare sulla carta. Consiglio di rafforzare la validazione con clienti reali e di rivedere le ipotesi conservative prima di presentare il piano a terzi.`

  const paroleRiflessione = riflessioneFinale.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />

      <main className="container mx-auto px-6 py-10 md:py-14 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => navigate('/business-plan')}
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna al Business Plan
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Analisi critica
          </h1>
          <p className="text-slate-400">
            L&apos;opinione critica e onesta dell&apos;AI sul tuo progetto: domande scomode, riflessioni e sintesi.
          </p>
        </div>

        {/* Sezione 1: 5 domande scomode e critiche */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-teal-400 mb-1 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-sm">1</span>
            5 domande scomode e critiche
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Domande dell&apos;AI che mettono in luce aspetti a cui potresti non aver pensato.
          </p>
          <ul className="space-y-4">
            {domandeScomode.map((domanda, i) => (
              <li
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-[#0f1419] border border-slate-600/30 hover:border-teal-500/30 transition-colors"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 text-sm font-medium flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-slate-200 leading-relaxed">{domanda}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Sezione 2: 5 riflessioni molto critiche */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-teal-400 mb-1 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-sm">2</span>
            5 riflessioni critiche sul progetto
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Riflessioni dell&apos;AI su possibili falle e difficoltà del piano.
          </p>
          <ul className="space-y-4">
            {riflessioniCritiche.map((riflessione, i) => (
              <li
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-[#0f1419] border border-slate-600/30 hover:border-teal-500/30 transition-colors"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-slate-200 leading-relaxed">{riflessione}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Sezione 3: Riflessione finale (max 150 parole) */}
        <section>
          <h2 className="text-xl font-bold text-teal-400 mb-1 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-sm">3</span>
            Riflessione finale
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Sintesi critica dell&apos;AI (massimo {MAX_PAROLE_RIFLESSIONE} parole).
          </p>
          <div className="p-6 rounded-xl bg-[#0f1419] border border-slate-600/30">
            <p className="text-slate-200 leading-relaxed whitespace-pre-line">{riflessioneFinale}</p>
            <p className="mt-4 text-xs text-slate-500">
              Parole: <span className={paroleRiflessione > MAX_PAROLE_RIFLESSIONE ? 'text-red-400' : 'text-teal-400'}>{paroleRiflessione}</span> / {MAX_PAROLE_RIFLESSIONE}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AnalisiCriticaPage
