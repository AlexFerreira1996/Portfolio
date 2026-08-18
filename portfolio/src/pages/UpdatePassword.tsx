import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpdate = async (e:React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password })
        if (error) alert(error.message)
        else navigate('/dashboard')
        setLoading(false)
    }

    return (
        <main className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-xl font-bold mb-4">Nova senha</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="password"
                    placeholder="Nova senha"
                    required
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                />
                <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-lg">
                    {loading ? 'Salvando...' : 'Atualizar senha'}
                </button>
            </form>
        </main>
    )
}