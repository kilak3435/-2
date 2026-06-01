import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, CheckSquare, LogOut } from 'lucide-react';

export default function MainLayout() {
  const { currentUser, logout } = useAuth();

  const navClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[var(--color-incognito-surface-hover)] text-white' : 'text-[var(--color-incognito-text-muted)] hover:bg-[var(--color-incognito-surface)] hover:text-white'}`;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-incognito-bg)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-incognito-border)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-incognito-border)]">
          <h1 className="text-xl font-bold tracking-wider text-white">B-TRACKER</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={navClass} end>
            <LayoutDashboard size={20} />
            <span>Мои задачи</span>
          </NavLink>
          
          {currentUser?.role === 'admin' && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-semibold text-[var(--color-incognito-text-muted)] uppercase tracking-wider">
                Администрирование
              </div>
              <NavLink to="/admin/tasks" className={navClass}>
                <CheckSquare size={20} />
                <span>Все задачи</span>
              </NavLink>
              <NavLink to="/admin/users" className={navClass}>
                <Users size={20} />
                <span>Сотрудники</span>
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-[var(--color-incognito-border)] flex items-center justify-between px-6 bg-[var(--color-incognito-surface)]">
          <div className="text-lg font-medium text-white">
            Корпоративный Портал
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-white font-medium">{currentUser?.name}</div>
              <div className="text-xs text-[var(--color-incognito-text-muted)]">{currentUser?.role === 'admin' ? 'Администратор' : 'Сотрудник'}</div>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-[var(--color-incognito-text-muted)] hover:text-white hover:bg-[var(--color-incognito-surface-hover)] rounded-md transition-colors"
              title="Выйти"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
