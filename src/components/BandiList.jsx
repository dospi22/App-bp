import { useState, useMemo } from 'react'

// Mock data per i bandi
const mockBandi = [
  {
    id: 1,
    titolo: 'Bando per lavori di ristrutturazione scuole',
    categoria: 'edilizia',
    scadenza: '2026-03-15',
    importo: '€ 2.500.000',
    ente: 'Comune di Milano',
    descrizione: 'Interventi di ristrutturazione e adeguamento sismico di 5 edifici scolastici',
  },
  {
    id: 2,
    titolo: 'Digitalizzazione servizi pubblici',
    categoria: 'tecnologia',
    scadenza: '2026-02-28',
    importo: '€ 1.800.000',
    ente: 'Regione Lombardia',
    descrizione: 'Progetto per la digitalizzazione dei servizi amministrativi regionali',
  },
  {
    id: 3,
    titolo: 'Acquisto attrezzature mediche',
    categoria: 'sanita',
    scadenza: '2026-04-10',
    importo: '€ 3.200.000',
    ente: 'ASL Milano',
    descrizione: 'Fornitura di apparecchiature diagnostiche per ospedali pubblici',
  },
  {
    id: 4,
    titolo: 'Programma formazione professionale',
    categoria: 'istruzione',
    scadenza: '2026-03-20',
    importo: '€ 950.000',
    ente: 'Ministero dell\'Istruzione',
    descrizione: 'Corsi di formazione professionale per giovani disoccupati',
  },
  {
    id: 5,
    titolo: 'Riqualificazione aree verdi urbane',
    categoria: 'ambiente',
    scadenza: '2026-05-05',
    importo: '€ 1.500.000',
    ente: 'Comune di Roma',
    descrizione: 'Progetto di riqualificazione e manutenzione di parchi pubblici',
  },
  {
    id: 6,
    titolo: 'Efficientamento energetico edifici pubblici',
    categoria: 'ambiente',
    scadenza: '2026-04-30',
    importo: '€ 4.000.000',
    ente: 'Provincia di Torino',
    descrizione: 'Interventi di efficientamento energetico su 20 edifici pubblici',
  },
]

const BandiList = ({ searchQuery, selectedCategory }) => {
  const [savedBandi, setSavedBandi] = useState(new Set())

  const filteredBandi = useMemo(() => {
    return mockBandi.filter((bando) => {
      const matchesSearch = 
        !searchQuery || 
        bando.titolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bando.descrizione.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bando.ente.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = !selectedCategory || bando.categoria === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const toggleSave = (id) => {
    setSavedBandi((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getCategoryLabel = (cat) => {
    const labels = {
      edilizia: '🏗️ Edilizia',
      tecnologia: '💻 Tecnologia',
      sanita: '🏥 Sanità',
      istruzione: '📚 Istruzione',
      ambiente: '🌱 Ambiente',
    }
    return labels[cat] || cat
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="container mx-auto px-6 py-16 mt-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          Bandi Disponibili
        </h2>
        <p className="text-gray-400">
          {filteredBandi.length} {filteredBandi.length === 1 ? 'bando trovato' : 'bandi trovati'}
        </p>
      </div>

      {filteredBandi.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-xl">Nessun bando trovato con i filtri selezionati.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBandi.map((bando) => (
            <div
              key={bando.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all border border-gray-700 hover:border-teal-500/50"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-teal-400">
                  {getCategoryLabel(bando.categoria)}
                </span>
                <button
                  onClick={() => toggleSave(bando.id)}
                  className={`p-2 rounded-full transition-all ${
                    savedBandi.has(bando.id)
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {bando.titolo}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {bando.descrizione}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {bando.ente}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {bando.importo}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Scadenza: {formatDate(bando.scadenza)}
                </div>
              </div>

              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full font-medium transition-all">
                Visualizza Dettagli
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BandiList
