import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Projects from './pages/Projects' // Importando a nova página real

function Home() {
  const habilidades = [
    'Python',
    'Redes',
    'Linux',
    'HTML',
    'CSS3',
    'Lógica de Programação',
  ]

  return (
    <main className="cartao max-w-2xl mx-auto p-6 my-8 bg-white shadow-md rounded-xl">
      <header className="text-center my-6">
        <img
          src="/perfil.jpg"
          alt="Foto do perfil de Alex Ferreira"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow"
        />
        <h1 className="text-3xl font-bold">Alex Ferreira</h1>
        <p className="text-gray-600">Estudante de Segurança Cibernética</p>
      </header>

      <section className="my-6">
        <h2 className="text-xl font-semibold mb-2">Sobre mim</h2>
        <p className="text-gray-700 leading-relaxed">
          Sou fotógrafo e filmmaker freelancer, estou na TI há 3 anos, focando na
          área de segurança.
        </p>
      </section>

      <section className="habilidades my-6">
        <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
        <ul className="flex flex-wrap gap-2">
          {habilidades.map((skill) => (
            <li
              key={skill}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="contato my-6">
        <h2 className="text-xl font-semibold mb-2">Contato</h2>
        <ul className="flex gap-4">
          <li>
            <a
              href="mailto:emaildeestudardealex@gmail.com"
              className="text-blue-600 hover:underline"
            >
              E-mail
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}

function AboutPlaceholder() {
  return <div className="max-w-4xl mx-auto p-6"><h2>Página Sobre</h2></div>
}

function ContactPlaceholder() {
  return <div className="max-w-4xl mx-auto p-6"><h2>Página Contato</h2></div>
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPlaceholder />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactPlaceholder />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}