import { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

export default function AdminTasks() {
  const { tasks, users, addTask, updateTask, deleteTask } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', description: '', assigneeId: '' });

  const openModal = (task = null) => {
    if (task) {
      setEditingId(task.id);
      setFormData({ title: task.title, description: task.description, assigneeId: task.assigneeId });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', assigneeId: users[0]?.id || '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateTask(editingId, formData);
    } else {
      addTask(formData);
    }
    setIsModalOpen(false);
  };

  const getAssigneeName = (id) => users.find(u => u.id === id)?.name || 'Удаленный пользователь';
  
  const statusMap = {
    'todo': { label: 'К выполнению', class: 'text-slate-300' },
    'in-progress': { label: 'В работе', class: 'text-blue-400' },
    'done': { label: 'Готово', class: 'text-green-400' }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Все задачи</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[var(--color-incognito-accent)] hover:bg-[var(--color-incognito-accent-hover)] text-[var(--color-incognito-bg)] px-4 py-2 rounded-md font-medium transition-colors">
          <Plus size={18} /> Создать задачу
        </button>
      </div>

      <div className="bg-[var(--color-incognito-surface)] rounded-lg border border-[var(--color-incognito-border)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-incognito-surface-hover)] border-b border-[var(--color-incognito-border)] text-[var(--color-incognito-text-muted)] text-sm">
              <th className="p-4 font-medium">Название</th>
              <th className="p-4 font-medium">Ответственный</th>
              <th className="p-4 font-medium">Статус</th>
              <th className="p-4 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b border-[var(--color-incognito-border)] hover:bg-[var(--color-incognito-surface-hover)]/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-white">{task.title}</div>
                  <div className="text-sm text-[var(--color-incognito-text-muted)] truncate max-w-md">{task.description}</div>
                </td>
                <td className="p-4 text-sm">{getAssigneeName(task.assigneeId)}</td>
                <td className={`p-4 text-sm font-medium ${statusMap[task.status]?.class}`}>{statusMap[task.status]?.label}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => openModal(task)} className="p-1.5 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => deleteTask(task.id)} className="p-1.5 text-red-400 hover:text-red-300 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr><td colSpan="4" className="p-8 text-center text-[var(--color-incognito-text-muted)]">Задач пока нет.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--color-incognito-surface)] w-full max-w-lg rounded-xl border border-[var(--color-incognito-border)] shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[var(--color-incognito-border)]">
              <h3 className="text-xl font-bold text-white">{editingId ? 'Редактировать задачу' : 'Новая задача'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-incognito-text-muted)] hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Название</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Описание</label>
                <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">Исполнитель</label>
                <select required value={formData.assigneeId} onChange={e => setFormData({...formData, assigneeId: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none">
                  {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.username})</option>)}
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
