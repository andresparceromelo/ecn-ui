import { AppLayout } from '../components/layout/AppLayout';
import { AdminMetrics } from '../components/admin/AdminMetrics';
import { AdminCharts } from '../components/admin/AdminCharts';
import { Spinner } from '../components/common/Spinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { useAdmin } from '../hooks/useAdmin';
import { useAdminCharts } from '../hooks/useAdminCharts';

export default function AdminPage() {
  const { data, isLoading, error, refetch } = useAdmin();
  const { data: chartsData, isLoading: chartsLoading, error: chartsError, refetch: refetchCharts } = useAdminCharts();

  return (
    <AppLayout>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>Panel de Administración</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Métricas globales del sistema
        </p>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorBanner message={error} onRetry={refetch} />
      ) : data ? (
        <AdminMetrics data={data} />
      ) : null}

      {chartsLoading ? (
        <div style={{ marginTop: 24 }}><Spinner /></div>
      ) : chartsError ? (
        <div style={{ marginTop: 24 }}>
          <ErrorBanner message={chartsError} onRetry={refetchCharts} />
        </div>
      ) : chartsData ? (
        <AdminCharts data={chartsData} />
      ) : null}
    </AppLayout>
  );
}
