import { Routes,Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminTasks from './pages/AdminTasks';
import AdminUsers from './pages/AdminUsers';

function Prot({ children, rAd }){
  const { currentUser}= useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (rAd && currentUser.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App(){
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
      
      <Route path="/" element={
        <Prot>
          <MainLayout />
        </Prot>
      }>
        <Route index element={<Dashboard />} />
        <Route path="admin/tasks" element={
          <Prot rAd>
            <AdminTasks />
          </Prot>
        } />
        <Route path="admin/users" element={
          <Prot rAd>
            <AdminUsers />
          </Prot>
       }/>
      </Route>
    </Routes>
  );
}
