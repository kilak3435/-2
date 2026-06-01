import{useState } from 'react';
import{useDb}from '../context/DatabaseContext';
import { Plus,Trash2, Edit2, X,ShieldAlert}from 'lucide-react';

export default function AdminUsers(){
  const{users,addUser,updateUser,deleteUser } = useDb();
  const [okno, setOkno] = useState(false);
  const [redID, setRedID] = useState(null);
  
  const [dannie,setDannie] = useState({ name: '',username:'', password: '', role:'user' });

  const otkritOkno = (u = null)=>{
    if (u){
      setRedID(u.id);
      setDannie({ name: u.name,username: u.username,password: u.password,role: u.role });
   }else {
      setRedID(null);
      setDannie({ name: '',username:'',password: '', role:'user' });
    }
    setOkno(true);
  };

  const sabmit=(e)=>{
    e.preventDefault();
    if (redID){
      updateUser(redID, dannie);
    } else {
      addUser(dannie);
    }
    setOkno(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">сотрудники</h2>
        <button onClick={()=>otkritOkno()} className="flex items-center gap-2 bg-[var(--color-incognito-accent)] hover:bg-[var(--color-incognito-accent-hover)] text-[var(--color-incognito-bg)] px-4 py-2 rounded-md font-medium transition-colors">
          <Plus size={18} /> добавить
        </button>
      </div>

      <div className="bg-[var(--color-incognito-surface)] rounded-lg border border-[var(--color-incognito-border)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-incognito-surface-hover)] border-b border-[var(--color-incognito-border)] text-[var(--color-incognito-text-muted)] text-sm">
              <th className="p-4 font-medium">фио</th>
              <th className="p-4 font-medium">лог</th>
              <th className="p-4 font-medium">права</th>
              <th className="p-4 font-medium text-right">действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-[var(--color-incognito-border)] hover:bg-[var(--color-incognito-surface-hover)]/50 transition-colors">
                <td className="p-4 font-medium text-white">{u.name}</td>
                <td className="p-4 text-sm text-[var(--color-incognito-text-muted)]">{u.username}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 'bg-slate-700 text-slate-300'}`}>
                    {u.role === 'admin' && <ShieldAlert size={12} />}
                    {u.role === 'admin' ? 'админ' : 'сотрудник'}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={()=>otkritOkno(u)} className="p-1.5 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => deleteUser(u.id)} disabled={u.username === 'admin'} className="p-1.5 text-red-400 hover:text-red-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {okno && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--color-incognito-surface)] w-full max-w-md rounded-xl border border-[var(--color-incognito-border)] shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[var(--color-incognito-border)]">
              <h3 className="text-xl font-bold text-white">{redID ? 'изменить' :'новый'}</h3>
              <button onClick={() => setOkno(false)} className="text-[var(--color-incognito-text-muted)] hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={sabmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">имя</label>
                <input required type="text" value={dannie.name} onChange={e => setDannie({...dannie, name:e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">логин</label>
                <input required type="text" value={dannie.username} onChange={e => setDannie({...dannie, username: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">пароль</label>
                <input required type="text" value={dannie.password} onChange={e => setDannie({...dannie,password: e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-incognito-text-muted)] mb-1">роль</label>
                <select required value={dannie.role} onChange={e=>setDannie({...dannie, role:e.target.value})} className="w-full bg-[var(--color-incognito-bg)] border border-[var(--color-incognito-border)] rounded px-3 py-2 text-white focus:border-[var(--color-incognito-accent)] outline-none">
                  <option value="user">сотрудник</option>
                  <option value="admin">админ</option>
                </select>
              </div>
              <div className="flex justify-end pt-4 gap-3">
                <button type="button" onClick={() => setOkno(false)} className="px-4 py-2 text-[var(--color-incognito-text-muted)] hover:text-white transition-colors">отмена</button>
                <button type="submit" className="bg-[var(--color-incognito-accent)] text-[var(--color-incognito-bg)] px-4 py-2 rounded font-medium hover:bg-[var(--color-incognito-accent-hover)] transition-colors">ок</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
