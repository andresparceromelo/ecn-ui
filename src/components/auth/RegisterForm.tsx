import { useState, useMemo } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { RegisterRequest } from '../../types/api.types';

interface Props {
  onSubmit: (data: RegisterRequest) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

export function RegisterForm({ onSubmit, isLoading, serverError }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordStrength = useMemo(() => {
    if (!password) return { text: '', color: 'transparent', width: '0%' };
    if (password.length < 6) return { text: 'Mala', color: '#ef4444', width: '33%' };
    if (password.length < 10 || !/\d/.test(password)) return { text: 'Media', color: '#eab308', width: '66%' };
    return { text: 'Segura', color: '#22c55e', width: '100%' };
  }, [password]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'El nombre es obligatorio';
    if (!email.includes('@')) next.email = 'Email inválido';
    if (password.length < 6) next.password = 'Mínimo 6 caracteres';
    if (password !== confirmPassword) next.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, email, password });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
      {serverError && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          borderLeft: '4px solid #ef4444',
          borderRadius: '4px',
          padding: '12px 16px',
          color: '#ef4444',
          fontSize: '0.9rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {serverError}
        </div>
      )}
      <Input label="Nombre" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Tu nombre" autoComplete="name" />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="tu@email.com" autoComplete="email" />
      <div>
        <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="Mínimo 6 caracteres" autoComplete="new-password" />
        {password && (
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              <span>Seguridad de contraseña</span>
              <span style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
            </div>
            <div style={{ height: '4px', background: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: passwordStrength.width, height: '100%', background: passwordStrength.color, transition: 'all 0.3s ease' }} />
            </div>
          </div>
        )}
      </div>
      <Input label="Confirmar contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} placeholder="Repite la contraseña" autoComplete="new-password" />
      <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
        Crear cuenta
      </Button>
    </form>
  );
}
