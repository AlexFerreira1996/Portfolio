import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        
        if (data.user) {
          navigate('/dashboard')
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', data.user.id)
            .single()

          if (profile && profile.username) {
            navigate(`/u/${profile.username}`)
          } else {
            navigate('/dashboard')
          }
        }
      }
    } catch (err: any) {
      setMessage(`Erro: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isSignUp ? 'Criar Conta' : 'Acessar Conta'}
      </h1>

      {message && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Carregando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem conta? Cadastrar'}
        </button>
      </div>
    </main>
  )
}