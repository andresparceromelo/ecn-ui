import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../common/Avatar';

export function Header() {
  const { user, logout, isAdmin, hasProfile } = useAuth();

  function handleLogout() {
    logout();
  }

  const baseUrl = (import.meta.env.VITE_API_URL as string ?? '').replace('/api/v1', '');
  const avatarUrl = user?.avatarUrl ? `${baseUrl}${user.avatarUrl}` : null;

  return (
    <header
      style={{
        height: 'var(--header-height)',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to={hasProfile ? '/dashboard' : '/onboarding'} style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)', textDecoration: 'none' }}>
          ECN
        </Link>
        {hasProfile !== false && (
          <nav style={{ display: 'flex', gap: 16 }}>
            <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
            <Link to="/create" style={navLinkStyle}>Nuevo registro</Link>
            <Link to="/profile" style={navLinkStyle}>Mi perfil</Link>
            {isAdmin && <Link to="/admin" style={navLinkStyle}>Admin</Link>}
          </nav>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {user && <Avatar src={avatarUrl} name={user.name} size={32} />}
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
          {user?.name}
        </span>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: '24px', maxWidth: 'var(--max-width)', width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--color-text-secondary)',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '4px 0',
  borderBottom: '2px solid transparent',
};

const logoutBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--color-danger)',
  color: 'var(--color-danger)',
  padding: '6px 14px',
  borderRadius: 'var(--radius)',
  fontWeight: 600,
  fontSize: '0.8rem',
  cursor: 'pointer',
};
