import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { api } from '../services/api';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    firstname: '', surname: '', email: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/usuario', formData);
      alert('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Não foi possível criar sua conta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordType = showPassword ? 'text' : 'password';

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crie sua conta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Já possui uma conta? <Link to="/login" className="font-medium text-primary hover:text-pink-500">Faça o login</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <input id="firstname" name="firstname" type="text" required placeholder="Nome" value={formData.firstname} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <input id="surname" name="surname" type="text" required placeholder="Sobrenome" value={formData.surname} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <input id="email" name="email" type="email" required placeholder="Seu e-mail" value={formData.email} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <div className="relative">
              <input id="password" name="password" type={passwordType} required placeholder="Crie uma senha" value={formData.password} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700" aria-label="Mostrar ou ocultar senha">{showPassword ? <FiEyeOff /> : <FiEye />}</button>
            </div>
            <input id="confirmPassword" name="confirmPassword" type={passwordType} required placeholder="Confirme sua senha" value={formData.confirmPassword} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">{isSubmitting ? 'Criando conta...' : 'Criar conta'}</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;