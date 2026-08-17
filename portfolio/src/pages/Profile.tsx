import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface ProfileData {
  full_name: string
  headline: string
  about: string
  skills: string[]
  avatar_url: string
  email: string
  linkedin: string
  github: string
}

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username?.toLowerCase())
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setProfile(data)
      }
    } catch (err) {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center my-20 text-gray-500">Carregando portfólio...</div>
  }

  if (notFound || !profile) {
    return (
      <div className="text-center my-20">
        <h2 className="text-2xl font-bold text-gray-800">Usuário não encontrado 🔍</h2>
        <p className="text-gray-600 mt-2">O perfil /u/{username} não existe ou foi removido.</p>
        <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">Voltar ao início</Link>
      </div>
    )
  }

  return (
    <main className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-blue-500">
            {profile.full_name?.charAt(0) || 'U'}
          </div>
        )}

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900">{profile.full_name}</h1>
          <p className="text-lg text-blue-600 font-medium mt-1">{profile.headline}</p>
        </div>
      </div>

      {profile.about && (
        <section className="py-6 border-b">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Sobre</h2>
          <p className="text-gray-600 whitespace-pre-line leading-relaxed">{profile.about}</p>
        </section>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <section className="py-6 border-b">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-200">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="pt-6 flex flex-wrap gap-4">
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            ✉️ {profile.email}
          </a>
        )}
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition">
            GitHub
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            LinkedIn
          </a>
        )}
      </section>
    </main>
  )
}