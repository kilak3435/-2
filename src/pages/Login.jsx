import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import{Lock } from 'lucide-react';

export default function Login() {
  const [log, setLog]=useState('');
  const [pass,setPass]=useState('');
  const [err, setErr] = useState('');
  const { login }=useAuth();

  const otpravit = (e) => {
    e.preventDefault();
    setErr('');
    const ok = login(log, pass);
    if (!ok) {
      setErr('неверный логин или пароль');
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
        <h2 className="text-2xl font-bold text-center text-white mb-8">вход в портал</h2>

        {err && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm text-center">
            {err}
          </div>
        )}

        <form onSubmit={otpravit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">логин</label>
            <input
              type="text"
              value={log}
              onChange={e=>setLog(e.target.value)}
              className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-incognito-accent)] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">пароль</label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-incognito-accent)] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-incognito-accent)] hover:bg-[var(--color-incognito-accent-hover)] text-[var(--color-incognito-bg)] font-bold py-2 px-4 rounded transition-colors mt-6"
          >
            войти
          </button>
        </form>
      </div>
    </div>
  );
}
