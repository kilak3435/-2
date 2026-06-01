import { createContext, useContext, useState, useEffect } from 'react';

const DatabaseContext = createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

const DEFAULT_USERS = [
  { id: '1', username: 'admin', password: '123', name: 'Администратор', role: 'admin' },
  { id: '2', username: 'user', password: '123', name: 'Сотрудник 1', role: 'user' }
];

const DEFAULT_TASKS = [
  { id: '101', title: 'Подготовить отчет', description: 'Ежемесячный отчет по продажам.', assigneeId: '2', status: 'todo', createdAt: new Date().toISOString() },
  { id: '102', title: 'Обновить каталог', description: 'Добавить новые товары на сайт.', assigneeId: '2', status: 'in-progress', createdAt: new Date().toISOString() }
];

export function DatabaseProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localUsers = localStorage.getItem('bitrix_users');
    const localTasks = localStorage.getItem('bitrix_tasks');
    
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      setUsers(DEFAULT_USERS);
      localStorage.setItem('bitrix_users', JSON.stringify(DEFAULT_USERS));
    }

    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    } else {
      setTasks(DEFAULT_TASKS);
      localStorage.setItem('bitrix_tasks', JSON.stringify(DEFAULT_TASKS));
    }
  }, []);

  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('bitrix_users', JSON.stringify(newUsers));
  };

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('bitrix_tasks', JSON.stringify(newTasks));
  };

  const addUser = (user) => saveUsers([...users, { ...user, id: Date.now().toString() }]);
  const updateUser = (id, updated) => saveUsers(users.map(u => u.id === id ? { ...u, ...updated } : u));
  const deleteUser = (id) => saveUsers(users.filter(u => u.id !== id));

  const addTask = (task) => saveTasks([...tasks, { ...task, id: Date.now().toString(), status: 'todo', createdAt: new Date().toISOString() }]);
  const updateTaskStatus = (id, status) => saveTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  const updateTask = (id, updated) => saveTasks(tasks.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTask = (id) => saveTasks(tasks.filter(t => t.id !== id));

  return (
    <DatabaseContext.Provider value={{
      users, addUser, updateUser, deleteUser,
      tasks, addTask, updateTaskStatus, updateTask, deleteTask
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}
