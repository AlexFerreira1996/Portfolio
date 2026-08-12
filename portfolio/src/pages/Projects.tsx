import { ShieldCheck, Terminal, Network, ExternalLink, Code2 } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  icon: typeof ShieldCheck
  githubUrl?: string
  demoUrl?: string
}

export default function Projects() {
  const projectsList: Project[] = [
    {
      id: '1',
      title: 'Port Scanner & Redes',
      description:
        'Script desenvolvido em Python para varredura de portas de rede e verificação de serviços ativos e vulnerabilidades básicas.',
      tags: ['Python', 'Redes', 'Segurança', 'Socket'],
      icon: Network,
      githubUrl: 'https://github.com',
    },
    {
      id: '2',
      title: 'Automação e Hardening Linux',
      description:
        'Conjunto de scripts em Bash/Shell para configuração segura de ambientes Linux, auditoria de permissões e controle de acessos.',
      tags: ['Linux', 'Bash', 'Segurança', 'SysAdmin'],
      icon: Terminal,
      githubUrl: 'https://github.com',
    },
    {
      id: '3',
      title: 'Analisador de Logins e Autenticações',
      description:
        'Ferramenta para análise automatizada de logs de autenticação (SSH/Web) identificando tentativas de ataque por força bruta.',
      tags: ['Python', 'Linux', 'Análise de Logs'],
      icon: ShieldCheck,
      githubUrl: 'https://github.com',
    },
  ]

  return (
    <section className="container max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projetos & Laboratórios</h1>
        <p className="text-gray-600 mt-2">
          Projetos práticos, scripts e estudos focados em segurança cibernética, redes e automação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsList.map((project) => {
          const IconComponent = project.icon
          return (
            <article
              key={project.id}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t text-sm">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      <Code2 className="h-4 w-4" /> Código
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-blue-600 hover:underline font-medium"
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}