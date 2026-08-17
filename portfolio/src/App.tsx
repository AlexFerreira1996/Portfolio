import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="p-4 bg-white border-b flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="font-bold text-xl text-blue-600">DevPortfolios</Link>
          <div className="space-x-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/dashboard" className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Meu Painel</Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/u/:username" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}