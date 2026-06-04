import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogList } from '../components/logs/LogList';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useLogs } from '../hooks/useLogs';
import type { Tab } from '../types/api.types';

const LABELS: Record<Tab, string> = {
  WEIGHTLIFTING: 'Weightlifting',
  RUNNING: 'Running',
  SWIMMING: 'Swimming',
  CYCLING: 'Cycling',
};

interface Props {
  discipline: Tab;
}

export default function DisciplinePage({ discipline }: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { logs, meta, isLoading, error, refetch, remove } = useLogs({
    page,
    limit: 10,
    discipline,
  });

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget);
    } catch {
      // error handled by hook
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, remove]);

  return (
    <div>
      {/* Plan próximamente banner */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--color-surface)',
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius)',
        marginBottom: 20,
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>📋</span>
        <span>Plan de entrenamiento disponible próximamente para <strong>{LABELS[discipline]}</strong></span>
      </div>

      {/* Header */}
      <div style={{
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>Registros de {LABELS[discipline]}</h2>
          {meta && (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Página {meta.page} de {meta.totalPages} ({meta.total} registros)
            </p>
          )}
        </div>

        <button
          onClick={() => navigate(`/create?discipline=${discipline}`)}
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
          + Nuevo
        </button>
      </div>

      <LogList
        logs={logs}
        meta={meta}
        isLoading={isLoading}
        error={error}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={(id) => setDeleteTarget(id)}
        onRetry={refetch}
          onCreateNew={() => navigate(`/create?discipline=${discipline}`)}
        onPageChange={setPage}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar registro"
        message="¿Estás seguro de eliminar este registro de entrenamiento? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
