import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedMember({ children }: { children: React.ReactNode }) {
  const { currentMember } = useAuth();
  return currentMember ? <>{children}</> : <Navigate to="/login" replace />;
}

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"        element={<Index />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/signup"  element={<Signup />} />
      <Route path="/dashboard" element={
        <ProtectedMember><MemberDashboard /></ProtectedMember>
      } />
      <Route path="/admin" element={
        <ProtectedAdmin><AdminDashboard /></ProtectedAdmin>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}
