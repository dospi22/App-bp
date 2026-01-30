import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { saveProject, getProject } from '../utils/projectStorage'
import { getBusinessPlanDraft } from '../utils/businessPlanDraft'
import { businessPlanSections } from '../data/businessPlanSections'

/** Renderizza testo con **grassetto** come HTML (resto escaped). */
function renderSimpleMarkdown(text) {
  if (!text || typeof text !== 'string') return ''
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  return escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
}

const initialBusinessPlanData = () => ({
  executiveSummary: '',
  descrizioneAzienda: '',
  analisiSettore: '',
  prodottiServizi: '',
  analisiMercato: '',
  analisiConcorrenza: '',
  pianoMarketing: '',
  pianoOperativo: '',
  pianoOrganizzativo: '',
  pianoFinanziario: '',
  fontiFinanziamento: '',
  swot: '',
  considerazioniConclusive: '',
  appendici: ''
})

const BusinessPlanPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [businessPlanData, setBusinessPlanData] = useState(initialBusinessPlanData)
  const [saveFeedback, setSaveFeedback] = useState(false)

  useEffect(() => {
    const projectId = location.state?.projectId
    if (projectId) {
      let cancelled = false
      getProject(projectId).then((project) => {
        if (cancelled) return
        if (project?.data && typeof project.data === 'object') {
          setBusinessPlanData(prev => ({ ...prev, ...project.data }))
        }
      })
      return () => { cancelled = true }
    } else {
      const draft = getBusinessPlanDraft()
      setBusinessPlanData(prev => ({ ...prev, ...draft }))
    }
  }, [location.state?.projectId])

  // Aggiorna il draft in tempo reale se la chat (in altra tab) aggiorna il draft
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'businessplan_draft' && e.newValue) {
        const draft = getBusinessPlanDraft()
        setBusinessPlanData(prev => ({ ...prev, ...draft }))
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const sections = businessPlanSections

  const completionPercentage = () => {
    const total = sections.length
    const completed = sections.filter(section => 
      businessPlanData[section.id] && businessPlanData[section.id].trim().length > 0
    ).length
    return Math.round((completed / total) * 100)
  }

  const handleSave = async () => {
    const name = window.prompt('Nome del progetto (opzionale)', `Business Plan ${new Date().toLocaleDateString('it-IT')}`) || `Business Plan ${new Date().toLocaleDateString('it-IT')}`
    await saveProject({
      type: 'business-plan',
      name,
      data: businessPlanData
    })
    setSaveFeedback(true)
    setTimeout(() => setSaveFeedback(false), 3000)
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white business-plan-page">
      {/* Area stampa/PDF: indice + percentuale a sinistra, contenuto a destra */}
      <div id="business-plan-print-area" className="hidden print:block print:p-8 print:bg-white print:text-black">
        <div className="print:flex print:gap-8 print:max-w-none">
          <aside className="print:w-32 print:flex-shrink-0 print:text-xs">
            <div className="print:font-semibold print:text-gray-600 print:uppercase print:mb-1">Indice</div>
            <div className="print:text-2xl print:font-bold print:text-gray-900 print:mb-4">{completionPercentage()}%</div>
            <div className="print:text-gray-500 print:mb-4">Completato</div>
            {sections.map((section, index) => (
              <div key={section.id} className="print:mb-1 print:text-gray-700">
                {index + 1}. {section.title.replace(/^\d+\.\s*/, '')}
              </div>
            ))}
          </aside>
          <div className="print:flex-1 print:min-w-0">
            <h1 className="print:text-3xl print:font-bold print:mb-2 print:border-b-2 print:border-gray-800 print:pb-2 print:text-gray-900">Business Plan</h1>
            <p className="print:text-sm print:text-gray-600 print:mb-8">Documento generato il {new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            {sections.map((section) => {
              const content = businessPlanData[section.id]?.trim()
              return (
                <div key={section.id} className="print:mb-8 print:break-inside-avoid">
                  <h2 className="print:text-lg print:font-bold print:mt-6 print:mb-2 print:border-b print:border-gray-200 print:pb-1 print:text-gray-900">{section.title}</h2>
                  <div className="print:text-sm print:whitespace-pre-wrap print:leading-relaxed print:text-gray-800">{content || '— Non compilato —'}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/chat')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Torna alla Chat
            </button>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-sm text-gray-300">
                Completamento: <span className="text-teal-400 font-bold">{completionPercentage()}%</span>
              </div>
              <button
                onClick={() => navigate('/consulente-ai', { state: { fromBusinessPlan: true } })}
                className="px-5 py-2 rounded-full font-medium bg-teal-500/20 border border-teal-500/50 text-teal-300 hover:bg-teal-500/30 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Consulente AI
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full font-medium border border-teal-500/50 text-teal-300 hover:bg-teal-500/20 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Salva
              </button>
              {saveFeedback && (
                <span className="text-sm text-teal-400 font-medium animate-pulse">Progetto salvato</span>
              )}
              <button
                onClick={() => navigate('/analisi-critica')}
                className="px-5 py-2 rounded-full font-medium border border-amber-500/50 text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Analisi critica
              </button>
              <button
                onClick={() => navigate('/bandi')}
                className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-teal-500/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cerca Bandi
              </button>
              <button
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: due colonne — sinistra indice + %, destra business plan compilato */}
      <div className="flex px-4 py-6 gap-6 max-w-7xl mx-auto print:hidden min-h-[calc(100vh-4rem)]">
        {/* Colonna sinistra: indice + percentuale completamento */}
        <aside className="w-44 flex-shrink-0 sticky top-20 self-start">
          <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Indice</div>
            <div className="text-2xl font-bold text-teal-400 mb-3">{completionPercentage()}%</div>
            <div className="text-xs text-gray-500 mb-3">Completato</div>
            <nav className="space-y-1">
              {sections.map((section, index) => {
                const isFilled = businessPlanData[section.id]?.trim().length > 0
                return (
                  <a
                    key={section.id}
                    href={`#sezione-${section.id}`}
                    className={`block text-xs py-1 truncate rounded px-2 -mx-2 hover:bg-gray-700/50 ${
                      isFilled ? 'text-teal-300' : 'text-gray-500'
                    }`}
                    title={section.title}
                  >
                    {index + 1}. {section.title.replace(/^\d+\.\s*/, '')}
                  </a>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Colonna destra: business plan compilato (solo titoli + contenuto) */}
        <main className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-white mb-6 pb-2 border-b border-gray-700">Business Plan</h1>
          <div className="space-y-8">
            {sections.map((section, index) => {
              const content = businessPlanData[section.id]?.trim()
              return (
                <section
                  key={section.id}
                  id={`sezione-${section.id}`}
                  className="scroll-mt-24"
                >
                  <h2 className="text-lg font-bold text-white mb-3 border-b border-gray-600 pb-1">
                    {section.title}
                  </h2>
                  <div
                    className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans [&_strong]:font-semibold [&_strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: content ? renderSimpleMarkdown(content) : '— Non compilato —' }}
                  />
                </section>
              )
            })}
          </div>

          {/* Pulsanti azione */}
          <div className="mt-10 pt-6 border-t border-gray-700 flex flex-wrap gap-4 justify-end">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg shadow-amber-500/30 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Scarica PDF
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(businessPlanData, null, 2)
              const dataBlob = new Blob([dataStr], { type: 'application/json' })
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = 'business-plan.json'
              link.click()
            }}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-medium transition-all"
          >
            Esporta JSON
          </button>
          <button
            onClick={() => {
              const text = sections.map(section => 
                `## ${section.title}\n\n${businessPlanData[section.id] || 'Non compilato'}\n`
              ).join('\n---\n\n')
              const dataBlob = new Blob([text], { type: 'text/plain' })
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = 'business-plan.txt'
              link.click()
            }}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-medium transition-all shadow-lg shadow-teal-500/50"
          >
            Esporta Testo
          </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default BusinessPlanPage
