import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/Portfolio/update-password`,
        })

        if (error) setMessage(`Erro: ${error.message}`)
        else setMessage('Verifique seu email para o link dealteração de senha.')
        setLoading(false)
    }

    return (
        <main className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-xl font-bold mb-4">Recuperar senha</h1>
            <form onSubmit={handleReset} className="space-y-4">
                <input
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    />
                    <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-lg">
                        {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                    </button>
            </form>
            {message && <p className="mt-4 text-sm">{message}</p>}
        </main>
    )
}