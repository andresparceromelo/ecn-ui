interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div
      style={{
        background: '#fef2f2',
        border: '1px solid var(--color-danger)',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: 'var(--color-danger)',
        fontSize: '0.9rem',
      }}
      role="alert"
    >
      <span style={{ flex: 1 }}>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'var(--color-danger)',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '4px 12px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.8rem',
          }}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
