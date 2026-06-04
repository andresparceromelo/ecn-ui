import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { useEffect } from 'react';

export default function LoginPage() {
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(data: { email: string; password: string }) {
    try {
      await login(data);
      // After login, hasProfile is already resolved by AuthContext
      // Guards will handle the redirect to /onboarding if needed
      navigate('/dashboard', { replace: true });
    } catch {
      // error is set in context
    }
  }

  return (
    <div
      className="auth-page"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: '#080b14',
        color: '#fff',
      }}
    >
      {/* Left decorative panel */}
      <div
        className="auth-side-panel"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 48,
          background: 'linear-gradient(135deg, rgba(138,43,226,0.25) 0%, rgba(62,180,137,0.12) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(62,180,137,0.2) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(138,43,226,0.2) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 2 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #3eb489, #8a2be2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>ecn<span style={{ color: '#3eb489' }}>.</span></span>
        </Link>

        {/* Quote */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.5px' }}>
            "El primer paso es
            <br />
            <span style={{ background: 'linear-gradient(90deg, #3eb489, #8a2be2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              conocerte a ti mismo.
            </span>"
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            — Motor de categorización clínica ECN
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div
        className="auth-form-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 64px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
            Bienvenido de vuelta
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 36, fontSize: '0.95rem' }}>
            Ingresa tus credenciales para continuar
          </p>
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} serverError={error} />
          <p style={{ marginTop: 24, textAlign: 'center', fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" onClick={clearError} style={{ color: '#3eb489', fontWeight: 600, textDecoration: 'none' }}>
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
