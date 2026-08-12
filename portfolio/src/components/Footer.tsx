import { Code2, User, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background py-6 mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 max-w-4xl mx-auto px-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          &copy; {currentYear} Alex Ferreira. Todos os direitos reservados.
        </p>

        <div className="flex gap-4 text-gray-500">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600 transition-colors"
          >
            <Code2 className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 transition-colors"
          >
            <User className="h-5 w-5" />
          </a>
          <a
            href="mailto:emaildeestudardealex@gmail.com"
            aria-label="E-mail"
            className="hover:text-blue-600 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}