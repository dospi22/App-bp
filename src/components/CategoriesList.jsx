const CategoriesList = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { 
      id: '', 
      label: 'Tutti', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'edilizia', 
      label: 'Edilizia', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      id: 'tecnologia', 
      label: 'Tecnologia', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    { 
      id: 'sanita', 
      label: 'Sanità', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      id: 'istruzione', 
      label: 'Istruzione', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      id: 'ambiente', 
      label: 'Ambiente', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ]

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`group relative w-full text-left px-5 py-4 rounded-xl transition-all duration-300 overflow-hidden ${
            selectedCategory === cat.id
              ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 border border-teal-400/50'
              : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30 hover:border-teal-500/50 hover:text-white'
          }`}
        >
          {/* Glow effect when selected */}
          {selectedCategory === cat.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-transparent animate-pulse"></div>
          )}
          
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/10 group-hover:to-transparent transition-all duration-300"></div>
          
          <div className="relative flex items-center gap-3">
            <div className={`flex-shrink-0 transition-transform duration-300 ${
              selectedCategory === cat.id 
                ? 'text-white scale-110' 
                : 'text-teal-400 group-hover:text-teal-300 group-hover:scale-110'
            }`}>
              {cat.icon}
            </div>
            <span className="font-medium text-sm tracking-wide">{cat.label}</span>
            
            {/* Arrow indicator */}
            <div className={`ml-auto transition-all duration-300 ${
              selectedCategory === cat.id 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default CategoriesList
