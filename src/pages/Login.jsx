import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-incognito-bg)] p-4">
      <div className="w-full max-w-md bg-[var(--color-incognito-surface)] rounded-lg shadow-xl border border-[var(--color-incognito-border)] p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[var(--color-incognito-surface-hover)] rounded-full flex items-center justify-center">
            <Lock className="text-[var(--color-incognito-accent)]" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">Вход в портал</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Логин</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-incognito-accent)] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-incognito-accent)] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-incognito-accent)] hover:bg-[var(--color-incognito-accent-hover)] text-[var(--color-incognito-bg)] font-bold py-2 px-4 rounded transition-colors mt-6"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
