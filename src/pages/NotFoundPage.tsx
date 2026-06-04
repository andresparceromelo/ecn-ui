import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
      <span style={{ fontSize: '4rem' }}>404</span>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Página no encontrada</h1>
      <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        La ruta que buscas no existe o fue movida.
      </p>
      <Link
        to="/dashboard"
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
