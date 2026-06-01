import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks, updateTaskStatus } = useDatabase();

  const myTasks = tasks.filter(t => t.assigneeId === currentUser.id);

  const statuses = [
    { id: 'todo', label: 'К выполнению', color: 'bg-slate-700/50 border-slate-600' },
    { id: 'in-progress', label: 'В работе', color: 'bg-blue-900/40 border-blue-700/50' },
    { id: 'done', label: 'Готово', color: 'bg-green-900/40 border-green-700/50' }
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-white">Мои задачи</h2>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {statuses.map(status => (
          <div key={status.id} className={`flex flex-col rounded-lg border ${status.color} p-4`}>
            <h3 className="font-semibold mb-4 text-white tracking-wide uppercase text-sm">{status.label}</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {myTasks.filter(t => t.status === status.id).map(task => (
                <div key={task.id} className="bg-[var(--color-incognito-surface)] p-4 rounded border border-[var(--color-incognito-border)] shadow-sm">
                  <h4 className="font-medium text-white mb-2">{task.title}</h4>
                  <p className="text-sm text-[var(--color-incognito-text-muted)] mb-4">{task.description}</p>
                  
                  <div className="flex gap-2">
                    {status.id !== 'todo' && (
                      <button onClick={() => updateTaskStatus(task.id, 'todo')} className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors">Начать заново</button>
                    )}
                    {status.id !== 'in-progress' && (
                      <button onClick={() => updateTaskStatus(task.id, 'in-progress')} className="text-xs px-2 py-1 bg-blue-700 hover:bg-blue-600 rounded text-white transition-colors">В работу</button>
                    )}
                    {status.id !== 'done' && (
                      <button onClick={() => updateTaskStatus(task.id, 'done')} className="text-xs px-2 py-1 bg-green-700 hover:bg-green-600 rounded text-white transition-colors">Завершить</button>
                    )}
                  </div>
                </div>
              ))}
              {myTasks.filter(t => t.status === status.id).length === 0 && (
                <div className="text-center p-4 text-[var(--color-incognito-text-muted)] text-sm">
                  Нет задач
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
