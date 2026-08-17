import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [headline, setHeadline] = useState('')
  const [about, setAbout] = useState('')
  const [skills, setSkills] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setUsername(data.username || '')
        setFullName(data.full_name || '')
        setHeadline(data.headline || '')
        setAbout(data.about || '')
        setSkills(data.skills ? data.skills.join(', ') : '')
        setAvatarUrl(data.avatar_url || '')
        setEmail(data.email || user.email || '')
        setLinkedin(data.linkedin || '')
        setGithub(data.github || '')
      }
    } catch (err: any) {
      console.error('Erro ao carregar perfil:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setMessage('')

      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      setAvatarUrl(data.publicUrl)
      setMessage('Imagem enviada com sucesso!')
    } catch (err: any) {
      setMessage(`Erro ao enviar imagem: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado.')

      const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean)

      const updates = {
        id: user.id,
        username: username.toLowerCase().trim(),
        full_name: fullName,
        headline,
        about,
        skills: skillsArray,
        avatar_url: avatarUrl,
        email,
        linkedin,
        github,
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error

      setMessage('Perfil atualizado com sucesso!')
    } catch (err: any) {
      setMessage(`Erro: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return <div className="text-center my-12 text-gray-600">Carregando painel...</div>
  }

  return (
    <main className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Painel do Perfil</h1>
        <div className="flex gap-2">
          {username && (
            <a
              href={`/u/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Ver Meu Perfil 🔗
            </a>
          )}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome de Usuário (URL)</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subtítulo (Cargo / Área)</label>
          <input
            type="text"
            placeholder="Estudante de Segurança Cibernética"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
          <div className="flex items-center gap-4">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Prévia"
                className="w-16 h-16 rounded-full object-cover border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {uploading && <p className="text-xs text-gray-500 mt-1">Enviando imagem...</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sobre Mim</label>
          <textarea
            rows={3}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Habilidades (separadas por vírgula)</label>
          <input
            type="text"
            placeholder="Python, Redes, Linux, HTML, CSS3"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </main>
  )
}