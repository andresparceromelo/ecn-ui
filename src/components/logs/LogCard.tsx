import type { PerformanceLog } from '../../types/api.types';

interface Props {
  log: PerformanceLog;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LOG_LABELS: Record<string, { metricLabel: string; repsLabel: string }> = {
  WEIGHTLIFTING: { metricLabel: 'kg', repsLabel: 'reps' },
  RUNNING: { metricLabel: 'km', repsLabel: 'min' },
  SWIMMING: { metricLabel: 'm', repsLabel: 'min' },
  CYCLING: { metricLabel: 'km', repsLabel: 'min' },
};

export function LogCard({ log, onEdit, onDelete }: Props) {
  const labels = LOG_LABELS[log.discipline] ?? { metricLabel: '', repsLabel: '' };
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{log.exerciseName}</span>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: 12,
            background: log.discipline === 'WEIGHTLIFTING' ? '#dbeafe' : '#f3e8ff',
            color: log.discipline === 'WEIGHTLIFTING' ? '#1e40af' : '#6b21a8',
            fontWeight: 600,
          }}>
            {log.discipline}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
          <span>{log.metricValue} {labels.metricLabel}</span>
          <span>{log.reps} {labels.repsLabel}</span>
          <span>{new Date(log.loggedAt).toLocaleDateString('es-CO')}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={() => onEdit(log.id)} style={actionBtnStyle}>
          Editar
        </button>
        <button onClick={() => onDelete(log.id)} style={{ ...actionBtnStyle, color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

const actionBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--color-border)',
  borderRadius: 4,
  padding: '4px 12px',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
};
