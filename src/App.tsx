import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes';
import { useAuth } from './hooks/useAuth';

function AuthRedirect() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const wasLoggedIn = useRef(!!token);

  useEffect(() => {
    if (wasLoggedIn.current && !user) {
      navigate('/login', { replace: true });
    }
    wasLoggedIn.current = !!user;
  }, [user, navigate]);

  return null;
}

function AppContent() {
  return (
    <>
      <AuthRedirect />
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
