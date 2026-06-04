import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useEffect } from 'react';

export default function RegisterPage() {
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/onboarding', { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(data: { name: string; email: string; password: string }) {
    try {
      await register(data);
      // New athletes → always go to onboarding first
      navigate('/onboarding', { replace: true });
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
          background: 'linear-gradient(135deg, rgba(62,180,137,0.2) 0%, rgba(138,43,226,0.15) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ position: 'absolute', top: '5%', right: '-15%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(138,43,226,0.2) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(62,180,137,0.2) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 2 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #3eb489, #8a2be2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>ecn<span style={{ color: '#3eb489' }}>.</span></span>
        </Link>

        {/* Features list */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 24, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Todo lo que necesitas
            <br />
            <span style={{ background: 'linear-gradient(90deg, #3eb489, #8a2be2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              para entrenar mejor.
            </span>
          </h2>
          {[
            'Perfil clínico con métricas reales',
            'Registro de sesiones y 1RM',
            'Categorización BEGINNER → ELITE',
            'Dashboard de progresión',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(62,180,137,0.15)', border: '1px solid rgba(62,180,137,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3eb489', fontSize: '0.65rem' }}>✓</div>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 64px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
            Crea tu cuenta
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 36, fontSize: '0.95rem' }}>
            Comienza tu análisis clínico deportivo
          </p>
          <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} serverError={error} />
          <p style={{ marginTop: 24, textAlign: 'center', fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" onClick={clearError} style={{ color: '#3eb489', fontWeight: 600, textDecoration: 'none' }}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
