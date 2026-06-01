import { useState } from 'react';
import { useDb } from '../context/DatabaseContext';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

export default function AdminTasks() {
  const { tasks, users, addTask, updateTask, deleteTask } = useDb();
  const [okno, setOkno] = useState(false);
  const [redID, setRedID] = useState(null);
  
  const [dannie, setDannie] = useState({ title: '', description: '', assigneeId: '' });

  const otkritOkno = (t = null) => {
    if (t) {
      setRedID(t.id);
      setDannie({ title: t.title, description: t.description, assigneeId: t.assigneeId });
    } else {
      setRedID(null);
      setDannie({ title: '', description: '', assigneeId: users[0]?.id || '' });
    }
    setOkno(true);
  };

  const sabmit = (e) => {
    e.preventDefault();
    if (redID) {
      updateTask(redID, dannie);
    } else {
      addTask(dannie);
    }
    setOkno(false);
  };

  const imya = (id) => users.find(u => u.id === id)?.name || 'удален';
  
  const st = {
    'todo': { label: 'надо', class: 'text-slate-300' },
    'in-progress': { label: 'в работе', class: 'text-blue-400' },
    'done': { label: 'сделано', class: 'text-green-400' }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">все задачи</h2>
        <button onClick={() => otkritOkno()} className="flex items-center gap-2 bg-[var(--color-incognito-accent)] hover:bg-[var(--color-incognito-accent-hover)] text-[var(--color-incognito-bg)] px-4 py-2 rounded-md font-medium transition-colors">
          <Plus size={18} /> создать
        </button>
      </div>

      <div className="bg-[var(--color-incognito-surface)] rounded-lg border border-[var(--color-incognito-border)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-incognito-surface-hover)] border-b border-[var(--color-incognito-border)] text-[var(--color-incognito-text-muted)] text-sm">
              <th className="p-4 font-medium">название</th>
              <th className="p-4 font-medium">кто делает</th>
              <th className="p-4 font-medium">статус</th>
              <th className="p-4 font-medium text-right">кнопки</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id} className="border-b border-[var(--color-incognito-border)] hover:bg-[var(--color-incognito-surface-hover)]/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-white">{t.title}</div>
                  <div className="text-sm text-[var(--color-incognito-text-muted)] truncate max-w-md">{t.description}</div>
                </td>
                <td className="p-4 text-sm">{imya(t.assigneeId)}</td>
                <td className={`p-4 text-sm font-medium ${st[t.status]?.class}`}>{st[t.status]?.label}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => otkritOkno(t)} className="p-1.5 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => deleteTask(t.id)} className="p-1.5 text-red-400 hover:text-red-300 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr><td colSpan="4" className="p-8 text-center text-[var(--color-incognito-text-muted)]">пусто</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {okno && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--color-incognito-surface)] w-full max-w-lg rounded-xl border border-[var(--color-incognito-border)] shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[var(--color-incognito-border)]">
              <h3 className="text-xl font-bold text-white">{redID ? 'редакт' : 'новая задача'}</h3>
              <button onClick={() => setOkno(false)} className="text-[var(--color-incognito-text-muted)] hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={sabmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">название</label>
                <input required type="text" value={dannie.title} onChange={e => setDannie({...dannie, title: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">описание</label>
                <textarea rows="3" required value={dannie.description} onChange={e => setDannie({...dannie, description: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">кому дать</label>
                <select required value={dannie.assigneeId} onChange={e => setDannie({...dannie, assigneeId: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none">
                  {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.username})</option>)}
                </select>
              </div>
              <div className="flex justify-end pt-4 gap-3">
                <button type="button" onClick={() => setOkno(false)} className="px-4 py-2 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors">отмена</button>
                <button type="submit" className="bg-[var(--color-incognito-accent)] text-[var(--color-incognito-bg)] px-4 py-2 rounded font-medium hover:bg-[var(--color-incognito-accent-hover)] transition-colors">сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
