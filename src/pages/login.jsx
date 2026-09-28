import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaMicrosoft } from 'react-icons/fa';
import { api } from '../services/api';
import { useAuth } from '../contexts/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/usuario/token', { email, password });
      login(response.data.token);
      const destination = location.state?.from?.pathname || '/';
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.error || requestError.message || 'Não foi possível realizar o login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showUnavailableNotice = () => {
    setError('');
    setNotice('Recuperação de senha e login social ainda não estão disponíveis neste projeto.');
  };

  return (
    <div className="bg-violet-50 w-full flex items-center justify-center min-h-[calc(100vh-150px)] py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div className="text-left mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">Acesse sua conta</h2>
              <p className="mt-2 text-sm text-gray-600">
                Novo cliente? Então registre-se{' '}
                <Link to="/register" className="font-semibold text-pink-600 hover:underline">aqui</Link>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
              {notice && <p className="rounded-md bg-blue-50 p-3 text-sm text-blue-700" role="status">{notice}</p>}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)}
                  className="block w-full px-3 py-2.5 bg-gray-100 border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm"
                  placeholder="Insira seu e-mail" />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
                <input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(event) => setPassword(event.target.value)}
                  className="block w-full px-3 py-2.5 bg-gray-100 border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm"
                  placeholder="Insira sua senha" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label="Mostrar ou ocultar senha">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="text-right text-sm">
                <button type="button" onClick={showUnavailableNotice} className="font-medium text-pink-600 hover:underline">Esqueci minha senha</button>
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                {isSubmitting ? 'Acessando...' : 'Acessar conta'}
              </button>

              <div className="relative pt-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Login social indisponível</span></div>
              </div>

              <div className="flex justify-center gap-4">
                <button type="button" disabled title="Login social indisponível" aria-label="Login com Google indisponível" className="p-2 border border-gray-200 rounded-full cursor-not-allowed opacity-50"><FcGoogle size={20} /></button>
                <button type="button" disabled title="Login social indisponível" aria-label="Login com Facebook indisponível" className="p-2 border border-gray-200 rounded-full cursor-not-allowed opacity-50"><FaFacebook size={20} className="text-blue-600" /></button>
                <button type="button" disabled title="Login social indisponível" aria-label="Login com Microsoft indisponível" className="p-2 border border-gray-200 rounded-full cursor-not-allowed opacity-50"><FaMicrosoft size={20} className="text-sky-500" /></button>
              </div>
            </form>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <img src="/tenis-login-2.PNG" alt="Tênis decorativo" className="max-w-lg w-full drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;