import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BandiList from '../components/BandiList'
import CategoriesList from '../components/CategoriesList'

const BANDI_HERO_IMAGE = '/assets/bandi-hero.png'

const BandiPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />

      {/* Hero Section: sfondo immagine mano + palazzo neon */}
      <div className="relative min-h-[520px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BANDI_HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-[#0a0e1a]/40" aria-hidden />

        {/* Content: allineato in alto per non essere coperto dalla sezione sotto */}
        <div className="relative z-10 min-h-[520px] flex flex-col items-center justify-start pt-20 md:pt-24 pb-16 px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
              RICERCA BANDI
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-teal-300 mb-2 px-2">
              Dal bando nasce l&apos;impresa.
            </p>
            <p className="text-base md:text-lg text-slate-200 mb-8 max-w-xl mx-auto">
              Apri la mano all&apos;opportunità: trova i bandi giusti e trasforma l&apos;idea in azienda.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca bandi per parola chiave, settore, regione..."
                  className="w-full px-6 py-4 pr-14 rounded-full bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xl text-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section con filtri */}
      <div className="relative -mt-16 md:-mt-24 z-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Block - Categories */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">
                Categorie
              </h2>
              <p className="text-gray-300 mb-6">
                Scegli la categoria di bandi che ti interessa per trovare le opportunità più rilevanti.
              </p>
              <CategoriesList 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* Middle Block - Info */}
            <div className="bg-teal-500 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Informazioni
              </h2>
              <p className="text-white leading-relaxed">
                La nostra piattaforma ti aiuta a trovare e monitorare i bandi di gara pubblici e privati 
                più rilevanti per la tua attività. Siamo qui per supportarti nella ricerca delle migliori 
                opportunità di business e per semplificare il processo di partecipazione ai bandi.
              </p>
              <button 
                onClick={() => navigate('/business-plan')}
                className="mt-6 bg-white text-teal-500 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Crea Business Plan
                <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  →
                </span>
              </button>
            </div>

            {/* Right Block - Quick Actions */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">
                Azioni Rapide
              </h2>
              <p className="text-gray-300 mb-6">
                Accedi rapidamente alle funzionalità principali della piattaforma.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center justify-between">
                  Bandi Salvati
                  <span className="bg-white text-teal-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    →
                  </span>
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center justify-between">
                  Notifiche
                  <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    →
                  </span>
                </button>
                <button 
                  onClick={() => navigate('/chat')}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center justify-between"
                >
                  Chat AI
                  <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bandi List */}
      <div className="mt-8">
        <BandiList searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}

export default BandiPage
