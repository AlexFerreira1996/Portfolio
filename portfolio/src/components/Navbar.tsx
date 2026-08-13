import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Sobre', path: '/about' },
    { label: 'Projetos', path: '/projects' },
    { label: 'Contato', path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 max-w-4xl items-center justify-between px-4 mx-auto">
        <NavLink to="/" className="font-bold text-lg hover:opacity-80 transition">
          Alex<span className="text-blue-600">Ferreira</span>
        </NavLink>

        <nav className="flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}