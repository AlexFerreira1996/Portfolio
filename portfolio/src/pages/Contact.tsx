export default function Contact() {
  return (
    <main className="max-w-2xl mx-auto p-6 my-8 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Entre em Contato</h1>
      <p className="text-gray-600 text-center mb-8">
        Sinta-se à vontade para se conectar comigo para projetos, oportunidades ou apenas para trocar uma ideia sobre Segurança Cibernética!
      </p>

      <div className="space-y-4">
        <a
          href="mailto:emaildeestudardealex@gmail.com"
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
        >
          <span className="text-2xl">📧</span>
          <div>
            <h3 className="font-semibold text-gray-800">E-mail</h3>
            <p className="text-sm text-gray-600">emaildeestudardealex@gmail.com</p>
          </div>
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
        >
          <span className="text-2xl">💼</span>
          <div>
            <h3 className="font-semibold text-gray-800">LinkedIn</h3>
            <p className="text-sm text-gray-600">Conecte-se profissionalmente</p>
          </div>
        </a>

        <a
          href="https://github.com/alexferreira1996"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
        >
          <span className="text-2xl">💻</span>
          <div>
            <h3 className="font-semibold text-gray-800">GitHub</h3>
            <p className="text-sm text-gray-600">Confira meus repositórios e códigos</p>
          </div>
        </a>
      </div>
    </main>
  );
}