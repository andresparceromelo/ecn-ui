import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--color-text)',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.15s',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
};

const errorStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--color-danger)',
};

export function Input({ label, error, id, style, ...rest }: Props) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={wrapperStyle}>
      <label htmlFor={inputId} style={labelStyle}>
        {label}
      </label>
      <input
        id={inputId}
        style={{
          ...inputStyle,
          ...(error ? { borderColor: 'var(--color-danger)' } : {}),
          ...style,
        }}
        aria-invalid={!!error}
        {...rest}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}
