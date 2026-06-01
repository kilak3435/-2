import { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { Plus, Trash2, Edit2, X, ShieldAlert } from 'lucide-react';

export default function AdminUsers() {
  const { users, addUser, updateUser, deleteUser } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', username: '', password: '', role: 'user' });

  const openModal = (user = null) => {
    if (user) {
      setEditingId(user.id);
      setFormData({ name: user.name, username: user.username, password: user.password, role: user.role });
    } else {
      setEditingId(null);
      setFormData({ name: '', username: '', password: '', role: 'user' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, formData);
    } else {
      addUser(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Сотрудники</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[var(--color-incognito-accent)] hover:bg-[var(--color-incognito-accent-hover)] text-[var(--color-incognito-bg)] px-4 py-2 rounded-md font-medium transition-colors">
          <Plus size={18} /> Добавить сотрудника
        </button>
      </div>

      <div className="bg-[var(--color-incognito-surface)] rounded-lg border border-[var(--color-incognito-border)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-incognito-surface-hover)] border-b border-[var(--color-incognito-border)] text-[var(--color-incognito-text-muted)] text-sm">
              <th className="p-4 font-medium">Имя</th>
              <th className="p-4 font-medium">Логин</th>
              <th className="p-4 font-medium">Роль</th>
              <th className="p-4 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-[var(--color-incognito-border)] hover:bg-[var(--color-incognito-surface-hover)]/50 transition-colors">
                <td className="p-4 font-medium text-white">{user.name}</td>
                <td className="p-4 text-sm text-[var(--color-incognito-text-muted)]">{user.username}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 'bg-slate-700 text-slate-300'}`}>
                    {user.role === 'admin' && <ShieldAlert size={12} />}
                    {user.role === 'admin' ? 'Администратор' : 'Сотрудник'}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => openModal(user)} className="p-1.5 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => deleteUser(user.id)} disabled={user.username === 'admin'} className="p-1.5 text-red-400 hover:text-red-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--color-incognito-surface)] w-full max-w-md rounded-xl border border-[var(--color-incognito-border)] shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[var(--color-incognito-border)]">
              <h3 className="text-xl font-bold text-white">{editingId ? 'Редактировать профиль' : 'Новый сотрудник'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-incognito-text-muted)] hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Имя (ФИО)</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Логин</label>
                <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Пароль</label>
                <input required type="text" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Права доступа</label>
                <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none">
                  <option value="user">Обычный сотрудник</option>
                  <option value="admin">Администратор (полный доступ)</option>
                </select>
              </div>
              <div className="flex justify-end pt-4 gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors">Отмена</button>
                <button type="submit" className="bg-[var(--color-incognito-accent)] text-[var(--color-incognito-bg)] px-4 py-2 rounded font-medium hover:bg-[var(--color-incognito-accent-hover)] transition-colors">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
