import { Mail, User, Code2, Send } from 'lucide-react'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso! (Modo de demonstração)')
  }

  return (
    <section className="container max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Entre em Contato</h1>
        <p className="text-gray-600 mt-2">
          Tem alguma proposta de projeto, oportunidade de TI/Segurança Cibernética ou quer conversar? Envie uma mensagem!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulário de Mensagem Direta */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Enviar Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="Seu nome"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="seu.email@exemplo.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="Como posso te ajudar?"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm"
            >
              <Send className="h-4 w-4" /> Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Canais Diretos */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-2">Canais de Contato</h2>

            <a
              href="mailto:emaildeestudardealex@gmail.com"
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50/50 transition text-gray-700 hover:text-blue-600"
            >
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">E-mail Direto</p>
                <p className="text-sm font-medium">emaildeestudardealex@gmail.com</p>
              </div>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50/50 transition text-gray-700 hover:text-blue-600"
            >
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Rede Profissional</p>
                <p className="text-sm font-medium">LinkedIn</p>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50/50 transition text-gray-700 hover:text-blue-600"
            >
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Repositórios de Código</p>
                <p className="text-sm font-medium">GitHub</p>
              </div>
            </a>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
            💡 <strong>Nota:</strong> Atualmente estou aberto a novos desafios na área de TI, Suporte Técnico, Redes e Segurança Cibernética.
          </div>
        </div>
      </div>
    </section>
  )
}