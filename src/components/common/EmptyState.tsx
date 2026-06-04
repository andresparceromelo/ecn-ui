interface Props {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ message, actionLabel, onAction }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: '48px 24px',
        color: 'var(--color-text-secondary)',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '3rem' }}>📭</span>
      <p style={{ fontSize: '1rem' }}>{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '10px 20px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
