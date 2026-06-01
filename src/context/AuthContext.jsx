import { createContext, useContext, useState, useEffect } from 'react';
import { useDb } from './DatabaseContext';

const AContext = createContext();

export function useAuth() {
  return useContext(AContext);
}

export function AuthProvider({ children }) {
  const [tekUsr, setTekUsr] = useState(null);
  const [zagr, setZagr] = useState(true);
  const { users } = useDb();

  useEffect(() => {
    const s = localStorage.getItem('bx_session');
    if (s && users.length > 0) {
      const u = users.find(x => x.id === s);
      if (u) setTekUsr(u);
    }
    setZagr(false);
  }, [users]);

  const login = (un, pw) => {
    const u = users.find(x => x.username === un && x.password === pw);
    if (u) {
      setTekUsr(u);
      localStorage.setItem('bx_session', u.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setTekUsr(null);
    localStorage.removeItem('bx_session');
  };

  return (
    <AContext.Provider value={{ currentUser: tekUsr, login, logout, loading: zagr }}>
      {!zagr && children}
    </AContext.Provider>
  );
}
