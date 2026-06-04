import type { DashboardData } from '../../types/api.types';

interface Props {
  data: DashboardData;
}

export function AdminMetrics({ data }: Props) {
  const cards = [
    { label: 'Atletas registrados', value: data.totalAthletes, color: '#2563eb' },
    { label: 'Total de registros', value: data.totalLogs, color: '#16a34a' },
    { label: 'Registros esta semana', value: data.logsThisWeek, color: '#d97706' },
    { label: 'Promedio por atleta', value: data.averageLogsPerAthlete.toFixed(1), color: '#9333ea' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            padding: 24,
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 8 }}>{card.label}</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: card.color }}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
