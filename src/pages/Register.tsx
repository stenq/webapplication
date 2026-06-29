import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }
    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return;
    }
    const result = register(email, password, name);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-4xl font-light mb-8 text-center">Zarejestruj się</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Imię i nazwisko"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Hasło (min. 6 znaków)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Potwierdź hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-black text-white py-3 text-sm tracking-widest hover:bg-gray-800 transition">
          ZAREJESTRUJ SIĘ
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Masz już konto?{' '}
        <Link to="/login" className="text-black underline">Zaloguj się</Link>
      </p>
    </div>
  );
}