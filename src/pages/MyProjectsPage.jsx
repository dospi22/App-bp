import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { getProjects, deleteProject } from '../utils/projectStorage'

const MyProjectsPage = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let cancelled = false
    getProjects().then((list) => {
      if (!cancelled) setProjects(list)
    })
    return () => { cancelled = true }
  }, [])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (window.confirm('Eliminare questo progetto?')) {
      await deleteProject(id)
      const list = await getProjects()
      setProjects(list)
    }
  }

  const handleOpen = (project) => {
    if (project.type === 'chat') {
      navigate('/chat', { state: { projectId: project.id } })
    } else {
      navigate('/business-plan', { state: { projectId: project.id } })
    }
  }

  const formatDate = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className="min-h-screen text-white flex flex-col relative">
      {/* Sfondo: mano + palazzo neon (stile futuristico) */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: 'url(/assets/progetti-background.png)' }}
      />
      <div className="fixed inset-0 bg-[#0a0e1a]/50 -z-10 pointer-events-none" aria-hidden />

      <Header />

      <main className="flex-1 container mx-auto px-6 py-12 md:py-16 relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            I miei progetti
          </h1>
          <p className="text-slate-400 mb-8">
            I progetti che hai salvato dalla Chat AI o dal Business Plan. Clicca su un progetto per riaprirlo.
          </p>

          {projects.length === 0 ? (
            <div className="rounded-2xl bg-[#0f1419] border border-slate-600/30 p-6 md:p-8 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm mb-3">
                Non hai ancora progetti salvati.
              </p>
              <p className="text-xs text-slate-500 mb-5">
                Salva un progetto dalla Chat AI o dalla pagina Business Plan con il pulsante &quot;Salva&quot; per ritrovarlo qui.
              </p>
              <button
                onClick={() => navigate('/chat')}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all"
              >
                Crea il tuo progetto ora
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li
                  key={project.id}
                  onClick={() => handleOpen(project)}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0f1419] border border-slate-600/30 hover:border-teal-500/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                      {project.type === 'chat' ? (
                        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-white truncate">{project.name}</p>
                      <p className="text-sm text-slate-500">
                        {project.type === 'chat' ? 'Chat AI' : 'Business Plan'} · {formatDate(project.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => handleDelete(e, project.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      aria-label="Elimina progetto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <span className="text-slate-500 group-hover:text-teal-400 transition-colors">
                      Apri →
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

export default MyProjectsPage
