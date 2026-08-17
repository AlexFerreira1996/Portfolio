import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface ProfileData {
  id: string
  username: string
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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    checkUserAndFetchProfile()
  }, [username])

  const checkUserAndFetchProfile = async () => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setCurrentUserId(user.id)
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username?.toLowerCase().trim())
        .single()

      if (error) throw error
      setProfile(data)
    } catch (err: any) {
      console.error('Erro ao buscar perfil:', err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center my-12 text-gray-600">Carregando perfil...</div>
  }

  if (!profile) {
    return <div className="text-center my-12 text-red-600 font-semibold">Perfil não encontrado.</div>
  }

  const isOwner = currentUserId === profile.id

  return (
    <main className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border relative">
      {isOwner && (
        <div className="flex justify-end mb-4">
          <Link
            to="/dashboard"
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Editar Perfil
          </Link>
        </div>
      )}

      <div className="flex items-center gap-6 pb-6 border-b">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-2xl font-bold text-blue-600">
            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
          {profile.headline && <p className="text-blue-600 font-medium">{profile.headline}</p>}
        </div>
      </div>

      {profile.about && (
        <div className="py-6 border-b">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Sobre</h2>
          <p className="text-gray-600 whitespace-pre-line">{profile.about}</p>
        </div>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <div className="py-6 border-b">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 flex flex-wrap gap-3">
        {profile.email && (
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md flex items-center gap-1">
             {profile.email}
          </span>
        )}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-100 transition"
          >
            LinkedIn 
          </a>
        )}
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-md hover:bg-gray-900 transition"
          >
            GitHub 
          </a>
        )}
      </div>
    </main>
  )
}