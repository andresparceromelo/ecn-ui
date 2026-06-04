import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LogForm } from '../components/logs/LogForm';
import { Spinner } from '../components/common/Spinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { useLogs } from '../hooks/useLogs';
import type { PerformanceLog, CreateLogRequest, UpdateLogRequest, Discipline } from '../types/api.types';

const VALID_DISCIPLINES = ['WEIGHTLIFTING', 'RUNNING', 'SWIMMING', 'CYCLING'];

export default function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = !!id;
  const rawDiscipline = searchParams.get('discipline')?.toUpperCase() ?? '';
  const preselectedDiscipline = !isEditing && VALID_DISCIPLINES.includes(rawDiscipline)
    ? (rawDiscipline as Discipline)
    : undefined;
  const { create, update, getById } = useLogs();

  const [initialData, setInitialData] = useState<PerformanceLog | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoadingData(true);
    setDataError(null);
    getById(id)
      .then(setInitialData)
      .catch((err: unknown) => {
        const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al cargar registro';
        setDataError(msg);
      })
      .finally(() => setIsLoadingData(false));
  }, [id, getById]);

  const handleSubmit = useCallback(async (data: CreateLogRequest | UpdateLogRequest) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditing && id) {
        await update(id, data as UpdateLogRequest);
      } else {
        await create(data as CreateLogRequest);
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al guardar registro';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }, [isEditing, id, create, update, navigate]);

  return (
    <AppLayout>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>
          {isEditing ? 'Editar registro' : 'Nuevo registro'}
        </h1>

        {isLoadingData ? (
          <Spinner />
        ) : dataError ? (
          <ErrorBanner message={dataError} onRetry={() => window.location.reload()} />
        ) : (
          <>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 24 }}>
              {isEditing ? 'Modifica los campos que deseas actualizar.' : 'Registra una nueva sesión de entrenamiento.'}
            </p>
            <LogForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              serverError={error}
              mode={isEditing ? 'edit' : 'create'}
              preselectedDiscipline={preselectedDiscipline}
            />
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
