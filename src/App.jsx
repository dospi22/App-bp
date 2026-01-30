import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import BusinessPlanPage from './pages/BusinessPlanPage'
import ConsulenteAIPage from './pages/ConsulenteAIPage'
import AnalisiCriticaPage from './pages/AnalisiCriticaPage'
import BandiPage from './pages/BandiPage'
import MyProjectsPage from './pages/MyProjectsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/business-plan" element={<BusinessPlanPage />} />
        <Route path="/consulente-ai" element={<ConsulenteAIPage />} />
        <Route path="/analisi-critica" element={<AnalisiCriticaPage />} />
        <Route path="/bandi" element={<BandiPage />} />
        <Route path="/progetti" element={<MyProjectsPage />} />
      </Routes>
    </Router>
  )
}

export default App
