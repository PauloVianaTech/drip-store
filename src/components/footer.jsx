import { Link } from 'react-router-dom';
import logoFooter from '../assets/logo-footer.svg';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const handleGoHome = () => {
    window.scrollTo({top: 0,  behavior: 'smooth'});
  };
  return (
  <footer className="bg-[#111] text-white px-6 md:px-20 py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <Link to="/" onClick={handleGoHome}>
        <img src={logoFooter} alt="Drip Store" className="h-8 mb-4" />
        </Link>
        <p className="text-sm text-gray-400 mb-4">E-commerce demonstrativo desenvolvido em React, com catálogo integrado à API, autenticação e carrinho de compras.</p>
        <div className="flex space-x-4" aria-label="Redes sociais do projeto">
          <a href="https://github.com/PauloVianaTech/ecommerce-drip-store" target="_blank" rel="noreferrer" aria-label="Repositório no GitHub"><FaGithub className="text-white hover:text-pink-600 transition" /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram className="text-white hover:text-pink-600 transition" /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn className="text-white hover:text-pink-600 transition" /></a>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Navegação</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link to="/" className="hover:text-white">Início</Link></li>
          <li><Link to="/produtos" className="hover:text-white">Produtos</Link></li>
          <li><Link to="/categorias" className="hover:text-white">Categorias</Link></li>
          <li><Link to="/pedidos" className="hover:text-white">Meu carrinho</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Categorias</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          {['Camisetas', 'Calças', 'Bonés', 'Headphones', 'Tênis'].map((category) => <li key={category}><Link to={`/produtos?categoria=${category}`} className="hover:text-white">{category}</Link></li>)}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Sobre o projeto</h3>
        <p className="text-sm text-gray-400 leading-relaxed">Projeto de portfólio voltado à prática de interfaces responsivas e integração entre frontend e backend.</p>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} Drip Store — Projeto de portfólio.</div>
  </footer>
  );
};

export default Footer;
