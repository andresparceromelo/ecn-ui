import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import type { AthleteStatsData } from '../../types/api.types';

interface Props {
  data: AthleteStatsData;
}

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#9333ea'];
const DISCIPLINE_LABELS: Record<string, string> = {
  WEIGHTLIFTING: '🏋️ Weightlifting',
  RUNNING: '🏃 Running',
  SWIMMING: '🏊 Swimming',
  CYCLING: '🚴 Cycling',
};

export function ProfileCharts({ data }: Props) {
  const monthData = data.logsByMonth.map((m) => ({
    name: m.month,
    value: m.count,
  }));

  const disciplineData = data.logsByDiscipline.map((d) => ({
    name: DISCIPLINE_LABELS[d.discipline] ?? d.discipline,
    value: d.count,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <MetricCard label="Total registros" value={data.totalLogs} color="#2563eb" />
        <MetricCard label="Disciplinas entrenadas" value={data.logsByDiscipline.length} color="#16a34a" />
        <MetricCard label="Meses activo" value={data.logsByMonth.length} color="#d97706" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
      }}>
        <ChartCard title="Progresión mensual">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthData} margin={{ left: -10 }}>
              <defs>
                <linearGradient id="profileMonthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }}
                formatter={(value) => [value, 'Registros']}
              />
              <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fill="url(#profileMonthGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución por disciplina">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={disciplineData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {disciplineData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }}
                formatter={(value, name) => [value, name]}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 16,
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 700, color }}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 20,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
