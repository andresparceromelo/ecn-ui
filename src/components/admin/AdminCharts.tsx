import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import type { AdminChartsData } from '../../types/api.types';

interface Props {
  data: AdminChartsData;
}

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#9333ea', '#ec4899', '#14b8a6', '#f97316', '#6366f1'];
const DISCIPLINE_LABELS: Record<string, string> = {
  WEIGHTLIFTING: '🏋️ Weightlifting',
  RUNNING: '🏃 Running',
  SWIMMING: '🏊 Swimming',
  CYCLING: '🚴 Cycling',
};
const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
  ELITE: 'Élite',
};

export function AdminCharts({ data }: Props) {
  const disciplineData = data.logsByDiscipline.map((d) => ({
    name: DISCIPLINE_LABELS[d.discipline] ?? d.discipline,
    value: d.count,
  }));

  const monthData = data.logsByMonth.map((m) => ({
    name: m.month,
    value: m.count,
  }));

  const levelData = data.athletesByLevel.map((l) => ({
    name: LEVEL_LABELS[l.level] ?? l.level,
    value: l.count,
  }));

  const roleData = data.usersByRole.map((r) => ({
    name: r.role === 'ATHLETE' ? 'Atletas' : 'Administradores',
    value: r.count,
  }));

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
      gap: 20,
      marginTop: 24,
    }}>
      <ChartCard title="Registros por disciplina">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={disciplineData} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={140} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }}
              formatter={(value) => [value, 'Registros']}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {disciplineData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Actividad mensual (últimos 12 meses)">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthData} margin={{ left: 0 }}>
            <defs>
              <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
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
            <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fill="url(#monthGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Atletas por nivel">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={levelData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {levelData.map((_, i) => (
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

      <ChartCard title="Usuarios por rol">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {roleData.map((_, i) => (
                <Cell key={i} fill={[COLORS[0], COLORS[7]][i % 2]} />
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
