import { createContext,useContext, useState,useEffect } from 'react';

const DbContext = createContext();

export function useDb(){
  return useContext(DbContext);
}

const DEF_USERS = [
  { id: '1',username: 'admin',password: '123', name:'Админ', role: 'admin' },
  { id: '2', username:'user',password: '123', name:'Сотрудник', role: 'user' }
];

const DEF_TASKS = [
  { id: '101',title: 'отчет', description: 'отчет по продажам',assigneeId: '2',status: 'todo', createdAt: new Date().toISOString() }
];

export function DbProvider({ children }) {
  const [lyudi, setLyudi]=useState([]);
  const [zadi,setZadi] = useState([]);

  useEffect(()=>{
    const l1=localStorage.getItem('bx_users');
    const l2 = localStorage.getItem('bx_tasks');
    
    if (l1) {
      setLyudi(JSON.parse(l1));
    } else {
      setLyudi(DEF_USERS);
      localStorage.setItem('bx_users',JSON.stringify(DEF_USERS));
    }

    if (l2){
      setZadi(JSON.parse(l2));
    } else {
      setZadi(DEF_TASKS);
      localStorage.setItem('bx_tasks',JSON.stringify(DEF_TASKS));
    }
  }, []);

  const saveL=(n)=>{
    setLyudi(n);
    localStorage.setItem('bx_users',JSON.stringify(n));
  };

  const saveZ = (n)=>{
    setZadi(n);
    localStorage.setItem('bx_tasks',JSON.stringify(n));
  };

  const addU = (u) => saveL([...lyudi,{ ...u, id: Date.now().toString() }]);
  const upU=(id, upd)=>saveL(lyudi.map(u=>u.id === id ? { ...u,...upd}: u));
  const delU = (id) => saveL(lyudi.filter(u => u.id !== id));

  const addZ=(t) => saveZ([...zadi, { ...t, id: Date.now().toString(),status:'todo',createdAt: new Date().toISOString() }]);
  const upZStat = (id,st) => saveZ(zadi.map(t => t.id === id ?{...t,status: st } : t));
  const upZ = (id, upd) => saveZ(zadi.map(t => t.id === id ?{...t,...upd}:t));
  const delZ=(id) => saveZ(zadi.filter(t => t.id !== id));

  return (
    <DbContext.Provider value={{
      users: lyudi, addUser: addU,updateUser: upU, deleteUser: delU,
      tasks: zadi, addTask:addZ,updateTaskStatus: upZStat,updateTask: upZ, deleteTask:delZ
    }}>
      {children}
    </DbContext.Provider>
  );
}
