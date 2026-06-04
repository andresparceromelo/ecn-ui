import { useState } from 'react';
import type { LoginRequest } from '../../types/api.types';
import { Spinner } from '../common/Spinner';

interface Props {
  onSubmit: (data: LoginRequest) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

export function LoginForm({ onSubmit, isLoading, serverError }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!email.includes('@')) next.email = 'Email inválido';
    if (password.length < 6) next.password = 'Mínimo 6 caracteres';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ email, password });
  }

  const inputStyle = (field: string, hasError?: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasError ? '#ef4444' : focusedField === field ? 'rgba(62,180,137,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 10,
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 6,
    letterSpacing: '0.3px',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }} noValidate>
      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderLeft: '4px solid #ef4444',
            borderRadius: 8,
            padding: '12px 16px',
            color: '#f87171',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          El usuario o la contraseña no coinciden
        </div>
      )}

      {/* Email */}
      <div>
        <label style={labelStyle} htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          placeholder="tu@email.com"
          autoComplete="email"
          style={inputStyle('email', errors.email)}
        />
        {errors.email && <span style={{ fontSize: '0.78rem', color: '#f87171', marginTop: 4, display: 'block' }}>{errors.email}</span>}
      </div>

      {/* Password */}
      <div>
        <label style={labelStyle} htmlFor="login-password">Contraseña</label>
        <div style={{ position: 'relative' }}>
          <input
            id="login-password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            placeholder="••••••"
            autoComplete="current-password"
            style={{ ...inputStyle('password', errors.password), paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4 }}
            tabIndex={-1}
          >
            {showPass ? '🙈' : '👁'}
          </button>
        </div>
        {errors.password && <span style={{ fontSize: '0.78rem', color: '#f87171', marginTop: 4, display: 'block' }}>{errors.password}</span>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '13px',
          background: isLoading ? 'rgba(138,43,226,0.5)' : 'linear-gradient(135deg, #8a2be2, #6a0dad)',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          boxShadow: isLoading ? 'none' : '0 4px 20px rgba(138,43,226,0.4)',
          transition: 'all 0.2s ease',
          marginTop: 4,
        }}
      >
        {isLoading ? <Spinner size={18} /> : 'Iniciar sesión'}
      </button>
    </form>
  );
}
