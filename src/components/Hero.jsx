const Hero = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Teal Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-teal-500/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
            RICERCA BANDI
          </h1>
          
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
  )
}

export default Hero
