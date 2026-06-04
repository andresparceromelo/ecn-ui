import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '10px 20px',
  border: 'none',
  borderRadius: 'var(--radius)',
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'background 0.15s, opacity 0.15s',
};

export function Button({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  style,
  ...rest
}: Props) {
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--color-primary)', color: '#fff' },
    danger: { background: 'var(--color-danger)', color: '#fff' },
    ghost: { background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
  };

  return (
    <button
      style={{
        ...base,
        ...variants[variant],
        ...(fullWidth ? { width: '100%' } : {}),
        ...(disabled || isLoading ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
        ...style,
      }}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Spinner size={16} />}
      {children}
    </button>
  );
}

function Spinner({ size = 20 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
}
