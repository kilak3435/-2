import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, CheckSquare, LogOut } from 'lucide-react';

export default function MainLayout() {
  const { currentUser, logout } = useAuth();

  const c = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[var(--color-incognito-surface-hover)] text-white' : 'text-[var(--color-incognito-text-muted)] hover:bg-[var(--color-incognito-surface)] hover:text-white'}`;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-incognito-bg)]">
      <aside className="w-64 border-r border-[var(--color-incognito-border)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-incognito-border)]">
          <h1 className="text-xl font-bold tracking-wider text-white">трекер</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={c} end>
            <LayoutDashboard size={20} />
            <span>мои задачи</span>
          </NavLink>
          
          {currentUser?.role === 'admin' && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-semibold text-[var(--color-incognito-text-muted)] uppercase tracking-wider">
                админка
              </div>
              <NavLink to="/admin/tasks" className={c}>
                <CheckSquare size={20} />
                <span>все задачи</span>
              </NavLink>
              <NavLink to="/admin/users" className={c}>
                <Users size={20} />
                <span>сотрудники</span>
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[var(--color-incognito-border)] flex items-center justify-between px-6 bg-[var(--color-incognito-surface)]">
          <div className="text-lg font-medium text-white">
            портал
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-white font-medium">{currentUser?.name}</div>
              <div className="text-xs text-[var(--color-incognito-text-muted)]">{currentUser?.role === 'admin' ? 'админ' : 'юзер'}</div>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-[var(--color-incognito-text-muted)] hover:text-white hover:bg-[var(--color-incognito-surface-hover)] rounded-md transition-colors"
              title="выйти"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
