import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function Navbar() {
  const [session, setSession] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="p-4 bg-white border-b flex justify-between items-center">
      <Link to="/" className="font-bold text-xl text-blue-600">
        Meu Portfólio
      </Link>
      <div className="space-x-4 flex items-center">
        {session ? (
          <>
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Painel
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/Portfolio">
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
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