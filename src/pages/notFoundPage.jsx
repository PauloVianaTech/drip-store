import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="min-h-[55vh] flex flex-col items-center justify-center px-4 text-center">
    <p className="text-pink-600 font-semibold mb-2">Erro 404</p>
    <h1 className="text-3xl font-bold text-gray-800">Página não encontrada</h1>
    <p className="mt-3 text-gray-600 max-w-md">O endereço informado não existe ou pode ter sido movido.</p>
    <Link to="/" className="mt-7 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition">Voltar para a página inicial</Link>
  </main>
);

export default NotFoundPage;