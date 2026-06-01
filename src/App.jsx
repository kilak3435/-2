import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminTasks from './pages/AdminTasks';
import AdminUsers from './pages/AdminUsers';

function ProtectedRoute({ children, requireAdmin }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (requireAdmin && currentUser.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="admin/tasks" element={
          <ProtectedRoute requireAdmin>
            <AdminTasks />
          </ProtectedRoute>
        } />
        <Route path="admin/users" element={
          <ProtectedRoute requireAdmin>
            <AdminUsers />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}
