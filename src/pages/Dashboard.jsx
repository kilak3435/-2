import { useAuth } from '../context/AuthContext';
import { useDb } from '../context/DatabaseContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks, updateTaskStatus } = useDb();

  const moiZadachi = tasks.filter(t => t.assigneeId === currentUser.id);

  const statusy = [
    { id: 'todo', label: 'надо сделать', color: 'bg-slate-700/50 border-slate-600' },
    { id: 'in-progress', label: 'делаю', color: 'bg-blue-900/40 border-blue-700/50' },
    { id: 'done', label: 'готово', color: 'bg-green-900/40 border-green-700/50' }
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-white">мои задачи</h2>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {statusy.map(s => (
          <div key={s.id} className={`flex flex-col rounded-lg border ${s.color} p-4`}>
            <h3 className="font-semibold mb-4 text-white tracking-wide uppercase text-sm">{s.label}</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {moiZadachi.filter(t => t.status === s.id).map(z => (
                <div key={z.id} className="bg-[var(--color-incognito-surface)] p-4 rounded border border-[var(--color-incognito-border)] shadow-sm">
                  <h4 className="font-medium text-white mb-2">{z.title}</h4>
                  <p className="text-sm text-[var(--color-incognito-text-muted)] mb-4">{z.description}</p>
                  
                  <div className="flex gap-2">
                    {s.id !== 'todo' && (
                      <button onClick={() => updateTaskStatus(z.id, 'todo')} className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors">сбросить</button>
                    )}
                    {s.id !== 'in-progress' && (
                      <button onClick={() => updateTaskStatus(z.id, 'in-progress')} className="text-xs px-2 py-1 bg-blue-700 hover:bg-blue-600 rounded text-white transition-colors">начать</button>
                    )}
                    {s.id !== 'done' && (
                      <button onClick={() => updateTaskStatus(z.id, 'done')} className="text-xs px-2 py-1 bg-green-700 hover:bg-green-600 rounded text-white transition-colors">сдать</button>
                    )}
                  </div>
                </div>
              ))}
              {moiZadachi.filter(t => t.status === s.id).length === 0 && (
                <div className="text-center p-4 text-[var(--color-incognito-text-muted)] text-sm">
                  пусто
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
