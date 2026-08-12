import { Shield, Camera, GraduationCap } from 'lucide-react'

export default function About() {
  const trajetoria = [
    {
      titulo: 'Segurança Cibernética & TI',
      descricao:
        'Focado há 3 anos no estudo de redes de computadores, administração de sistemas Linux, Python e análise de vulnerabilidades.',
      icone: Shield,
    },
    {
      titulo: 'Fotografia & Filmmaking',
      descricao:
        'Atuação como freelancer no setor audiovisual, desenvolvendo olhar crítico para detalhes, composição e gestão de projetos.',
      icone: Camera,
    },
  ]

  return (
    <section className="container max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sobre Mim</h1>
        <p className="text-gray-600 mt-2">
          Conheça um pouco mais sobre minha trajetória profissional, foco de estudos e paixões.
        </p>
      </div>

      {/* Cartão de Apresentação */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8 leading-relaxed text-gray-700 space-y-4">
        <p>
          Olá! Meu nome é <strong className="text-gray-900">Alex Ferreira</strong>. Trabalho no mercado audiovisual como fotógrafo e filmmaker freelancer e, nos últimos 3 anos, venho me dedicando intensamente à área de Tecnologia da Informação.
        </p>
        <p>
          Meu foco principal de estudos é a <strong className="text-blue-600">Segurança Cibernética</strong>, unindo conceitos fundamentais de redes, sistemas operacionais Linux e automação com scripts em Python para entender como proteger infraestruturas e identificar vulnerabilidades.
        </p>
      </div>

      {/* Destaques de Trajetória */}
      <h2 className="text-2xl font-bold tracking-tight mb-4">Áreas de Atuação</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {trajetoria.map((item) => {
          const IconComponent = item.icone
          return (
            <div key={item.titulo} className="border rounded-xl p-6 bg-white shadow-sm flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg h-fit">
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Formação e Competências */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3 text-blue-800 font-semibold text-lg">
          <GraduationCap className="h-5 w-5" />
          <span>Foco Atual de Estudos</span>
        </div>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
          <li>Arquitetura e Protocolos de Redes (TCP/IP, DNS, HTTP/HTTPS)</li>
          <li>Administração e Hardening de Servidores Linux</li>
          <li>Desenvolvimento de Scripts para Automação (Python & Shell Script)</li>
          <li>Fundamentos de Web Development (React, TypeScript, Tailwind CSS)</li>
        </ul>
      </div>
    </section>
  )
}