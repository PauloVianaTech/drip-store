import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const AuthLinks = () => {
  const { isAuthenticated, logout, user } = useAuth();

  if (isAuthenticated) {
    const firstName = user?.firstname?.split(' ')[0];
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-[14px] text-dark-gray-2">{firstName ? `Olá, ${firstName}` : 'Sessão ativa'}</span>
        <button onClick={logout} className="text-[14px] text-primary hover:text-pink-700 underline">Sair</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link to="/register" className="text-[14px] text-dark-gray-2 hover:text-primary underline">Cadastre-se</Link>
      <Link to="/login" className="bg-primary w-[114px] h-[40px] rounded-[4px] text-white font-bold text-[14px] flex items-center justify-center hover:bg-pink-700 transition-colors">Entrar</Link>
    </div>
  );
};

export default AuthLinks;