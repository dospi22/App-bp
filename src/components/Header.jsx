import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="bg-[#0a0e1a]/95 backdrop-blur-md border-b border-teal-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo (cliccabile = Home) */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label="Torna alla home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-cyan-200">
              BusinessPlan AI
            </span>
          </button>

          {/* Right side: Home + Accedi + Inizia Gratis */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#1e293b] hover:bg-[#334155] transition-all border border-slate-600/50"
            >
              Accedi
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/30"
            >
              Inizia Gratis
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
