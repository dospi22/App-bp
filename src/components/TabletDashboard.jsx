import { useState, useEffect } from 'react'

const TabletDashboard = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const barHeights = [35, 50, 65, 78, 92]
  const barHeightsRight = [30, 48, 62, 75, 88]

  // Line chart points (trend up)
  const linePoints = [20, 35, 28, 52, 45, 70, 65, 88]
  const linePath = linePoints.reduce((acc, y, i) => {
    const x = (i / (linePoints.length - 1)) * 100
    return acc + (i === 0 ? `M 0 ${100 - y}` : ` L ${x} ${100 - y}`)
  }, '')

  // Gantt: fasi progetto (nome, start%, durata%)
  const ganttTasks = [
    { label: 'Executive Summary', start: 0, width: 18 },
    { label: 'Analisi mercato', start: 20, width: 25 },
    { label: 'Piano finanziario', start: 48, width: 30 },
    { label: 'Validazione', start: 80, width: 18 }
  ]

  return (
    <div className="relative">
      <div className="rounded-2xl bg-[#0f1419] border-2 border-teal-500/30 shadow-2xl shadow-teal-500/10 overflow-hidden">
        <div className="p-5 md:p-6">
          {/* Animated charts + Gantt */}
          <div className="grid grid-cols-2 gap-3">
            {/* Upper Left - Taccuino + penna (illustrazione) */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-600/30 p-3 flex items-center justify-center min-h-[96px]">
              <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Taccuino: copertina */}
                <defs>
                  <linearGradient id="coverGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="15%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <linearGradient id="pageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="stilograficaBody" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="25%" stopColor="#1e293b" />
                    <stop offset="75%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <linearGradient id="nibShine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                </defs>
                {/* Quaderno: corpo principale */}
                <rect x="18" y="12" width="62" height="56" rx="2" fill="url(#coverGrad)" stroke="#475569" strokeWidth="1" />
                {/* Spina / binding */}
                <rect x="16" y="12" width="4" height="56" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.8" />
                {/* Pagina visibile con righe */}
                <rect x="22" y="16" width="54" height="48" rx="1" fill="url(#pageGrad)" stroke="#64748b" strokeWidth="0.6" opacity="0.95" />
                {[20, 26, 32, 38, 44, 50].map((y, i) => (
                  <line key={i} x1="26" y1={y} x2="72" y2={y} stroke="#475569" strokeWidth="0.4" opacity={0.5 - i * 0.03} />
                ))}
                {/* Scritto a mano sulla pagina */}
                <path d="M 28 22 Q 32 21 36 23 T 42 22" stroke="#06b6d4" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.85" />
                <path d="M 28 28 Q 35 27 44 29" stroke="#14b8a6" strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.8" />
                <path d="M 28 34 Q 30 36 34 34 L 40 35" stroke="#22d3ee" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.75" />
                <path d="M 28 48 Q 32 47 36 49 T 40 48" stroke="#5eead4" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.7" />
                {/* Penna stilografica (inclinata) */}
                <g transform="rotate(-32 78 42)">
                  {/* Corpo / barrel */}
                  <rect x="52" y="38.5" width="32" height="4" rx="2" fill="url(#stilograficaBody)" stroke="#475569" strokeWidth="0.5" />
                  {/* Cappuccio (estremità superiore) */}
                  <rect x="52" y="38.8" width="5" height="3.4" rx="1.5" fill="#334155" stroke="#475569" strokeWidth="0.4" />
                  <line x1="54" y1="40" x2="54" y2="40.8" stroke="#64748b" strokeWidth="0.3" opacity="0.8" />
                  {/* Sezione grip (più stretta prima della punta) */}
                  <rect x="80" y="39" width="6" height="3.8" rx="0.8" fill="#1e293b" stroke="#475569" strokeWidth="0.35" />
                  {/* Punta / nib stilografica: base ovale + punta a due alette */}
                  <ellipse cx="87.5" cy="40.5" rx="2.8" ry="1.6" fill="url(#nibShine)" stroke="#64748b" strokeWidth="0.35" />
                  <path d="M 86.2 40.5 L 88.8 40.5 M 87.5 39.2 L 87.5 41.8" stroke="#475569" strokeWidth="0.25" opacity="0.9" />
                  <path d="M 87.5 41.8 L 89.2 43.2 M 87.5 41.8 L 85.8 43.2" stroke="#94a3b8" strokeWidth="0.3" fill="none" />
                </g>
              </svg>
            </div>

            {/* Upper Right - Animated bar chart + growth arrow */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-600/30 p-3 relative">
              <div className="flex items-end justify-between h-24 gap-1">
                {barHeightsRight.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-teal-600 to-cyan-500 border border-cyan-400/50 transition-all duration-700 ease-out"
                    style={{
                      height: mounted ? `${h}%` : '0%',
                      minHeight: '8px',
                      transitionDelay: `${200 + i * 80}ms`
                    }}
                  />
                ))}
              </div>
              <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                  </marker>
                </defs>
                <path
                  d="M 5 32 Q 30 28, 50 22 Q 70 16, 95 8"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                  strokeDasharray="120"
                  strokeDashoffset={mounted ? 0 : 120}
                  style={{ transition: 'stroke-dashoffset 0.8s ease 0.5s' }}
                />
              </svg>
            </div>

            {/* Lower Left - Animated line chart (andamento validazione) */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-600/30 p-3">
              <p className="text-[9px] text-slate-400 mb-1">Andamento validazione</p>
              <div className="h-16 border-l-2 border-b-2 border-teal-500/50 pl-1 pb-1">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d={linePath}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="200"
                    style={{
                      strokeDashoffset: mounted ? 0 : 200,
                      transition: 'stroke-dashoffset 1s ease 0.2s'
                    }}
                  />
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Lower Right - Gantt (Timeline progetto) */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-600/30 p-3">
              <p className="text-[9px] text-slate-400 mb-2">Timeline progetto</p>
              <div className="space-y-2">
                {ganttTasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[8px] text-slate-500 w-16 flex-shrink-0 truncate" title={task.label}>{task.label}</span>
                    <div className="flex-1 h-3.5 bg-slate-700/50 rounded relative overflow-hidden border border-slate-600/40">
                      <div
                        className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-teal-600 to-cyan-500 border border-cyan-400/40 transition-all duration-700 ease-out"
                        style={{
                          left: `${task.start}%`,
                          width: mounted ? `${task.width}%` : '0%',
                          transitionDelay: `${400 + i * 120}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabletDashboard
