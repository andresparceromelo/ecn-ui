import type { PerformanceLog, PaginationMeta } from '../../types/api.types';
import { LogCard } from './LogCard';
import { Spinner } from '../common/Spinner';
import { EmptyState } from '../common/EmptyState';
import { ErrorBanner } from '../common/ErrorBanner';

interface Props {
  logs: PerformanceLog[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRetry: () => void;
  onCreateNew: () => void;
  onPageChange: (page: number) => void;
}

export function LogList({ logs, meta, isLoading, error, onEdit, onDelete, onRetry, onCreateNew, onPageChange }: Props) {
  if (isLoading) return <Spinner />;

  if (error) return <ErrorBanner message={error} onRetry={onRetry} />;

  if (logs.length === 0) {
    return (
      <EmptyState
        message="No hay registros de entrenamiento aún. ¡Crea el primero!"
        actionLabel="Nuevo registro"
        onAction={onCreateNew}
      />
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {logs.map((log) => (
          <LogCard key={log.id} log={log} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                padding: '6px 12px',
                borderRadius: 4,
                border: `1px solid ${page === meta.page ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: page === meta.page ? 'var(--color-primary)' : 'var(--color-surface)',
                color: page === meta.page ? '#fff' : 'var(--color-text)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
