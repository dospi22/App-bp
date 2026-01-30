/**
 * Sfondo hero Bandi: mano aperta da cui nasce un'azienda (palazzo/edificio).
 * Colori in linea con l'app (teal, cyan, #0a0e1a).
 */
const BandiHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base scura */}
      <div className="absolute inset-0 bg-[#0a0e1a]" />
      {/* Gradiente atmosferico */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 via-transparent to-cyan-900/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/80 via-transparent to-[#0a0e1a]/60" />

      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#134e4a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="30%" stopColor="#134e4a" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="palmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Mano aperta (palmo + 5 dita che si aprono, stilizzata) */}
        <g filter="url(#softGlow)" transform="translate(340, 80)">
          {/* Palma (ovale) */}
          <ellipse cx="420" cy="380" rx="95" ry="75" fill="url(#handGrad)" stroke="#14b8a6" strokeWidth="2" strokeOpacity="0.5" />
          {/* Dita aperte (ellissi allungate) */}
          <ellipse cx="350" cy="280" rx="28" ry="55" fill="url(#handGrad)" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(-25 350 280)" />
          <ellipse cx="400" cy="240" rx="26" ry="58" fill="url(#handGrad)" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(-10 400 240)" />
          <ellipse cx="450" cy="230" rx="26" ry="60" fill="url(#handGrad)" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(5 450 230)" />
          <ellipse cx="500" cy="255" rx="24" ry="52" fill="url(#handGrad)" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(22 500 255)" />
          <ellipse cx="535" cy="310" rx="22" ry="48" fill="url(#handGrad)" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(40 535 310)" />
          {/* Luce dal palmo (da cui nasce l'edificio) */}
          <ellipse cx="420" cy="380" rx="70" ry="55" fill="url(#palmGlow)" />
        </g>

        {/* Edificio / Azienda che nasce dal centro del palmo */}
        <g transform="translate(355, 220)" filter="url(#softGlow)">
          {/* Torre principale */}
          <path
            d="M 380 420 L 380 180 L 420 180 L 420 420 Z"
            fill="url(#buildingGrad)"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeOpacity="0.7"
          />
          {/* Finestre (righe orizzontali = piani azienda) */}
          {[220, 260, 300, 340, 380].map((y, i) => (
            <g key={i}>
              <rect x="388" y={y} width="8" height="12" rx="1" fill="url(#windowGlow)" opacity="0.9" />
              <rect x="400" y={y} width="8" height="12" rx="1" fill="url(#windowGlow)" opacity="0.85" />
              <rect x="412" y={y} width="8" height="12" rx="1" fill="url(#windowGlow)" opacity="0.9" />
            </g>
          ))}
          {/* Tetto / punta (simbolo crescita) */}
          <path
            d="M 375 180 L 400 150 L 425 180 Z"
            fill="#0e7490"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          {/* Ala laterale (estensione edificio = sede aziendale) */}
          <path
            d="M 420 350 L 420 280 L 480 280 L 480 350 Z"
            fill="url(#buildingGrad)"
            stroke="#14b8a6"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <rect x="430" y="290" width="10" height="14" rx="1" fill="url(#windowGlow)" opacity="0.8" />
          <rect x="445" y="290" width="10" height="14" rx="1" fill="url(#windowGlow)" opacity="0.8" />
          <rect x="460" y="290" width="10" height="14" rx="1" fill="url(#windowGlow)" opacity="0.8" />
        </g>
      </svg>
    </div>
  )
}

export default BandiHeroBackground
