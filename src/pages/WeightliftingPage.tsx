import { useState } from 'react';
import { usePlan } from '../hooks/usePlan';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from '../components/common/Avatar';
import { Spinner } from '../components/common/Spinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import type { PlanWeek, PlanDay, PlanExercise } from '../types/api.types';

const WEEK_ICONS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];
const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

export default function WeightliftingPage() {
  const { plan, isLoading, error, refetch } = usePlan('WEIGHTLIFTING');
  const [openWeek, setOpenWeek] = useState<number>(1);
  const { user } = useAuth();

  const baseUrl = (import.meta.env.VITE_API_URL as string ?? '').replace('/api/v1', '');
  const avatarUrl = user?.avatarUrl ? `${baseUrl}${user.avatarUrl}` : null;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 64 }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <ErrorBanner message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!plan) return null;

  const { athlete, reference1RM, weeks, progressionNotes } = plan;

  return (
    <div>
      {/* Athlete header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
        color: '#fff',
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <Avatar src={avatarUrl} name={athlete.name} size={56} />
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{athlete.name}</div>
        <div style={{ display: 'flex', gap: 24, marginTop: 8, fontSize: '0.85rem', opacity: 0.9 }}>
          <span>{LEVEL_LABELS[athlete.level] ?? athlete.level}</span>
          {athlete.experienceMonths != null && (
            <span>{athlete.experienceMonths} meses de experiencia</span>
          )}
        </div>
        <div style={{
          display: 'flex', gap: 24, marginTop: 12, flexWrap: 'wrap',
        }}>
          {reference1RM.squat != null && (
            <MetricBadge label="Sentadilla 1RM" value={`${reference1RM.squat} kg`} />
          )}
          {reference1RM.press != null && (
            <MetricBadge label="Press 1RM" value={`${reference1RM.press} kg`} />
          )}
          {reference1RM.deadlift != null && (
            <MetricBadge label="Peso Muerto 1RM" value={`${reference1RM.deadlift} kg`} />
          )}
        </div>
      </div>
    </div>

      {/* Week accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {weeks.map((w: PlanWeek, idx: number) => (
          <WeekAccordion
            key={w.week}
            week={w}
            index={idx}
            isOpen={openWeek === w.week}
            onToggle={() => setOpenWeek(openWeek === w.week ? -1 : w.week)}
          />
        ))}
      </div>

      {/* Progression notes */}
      {progressionNotes.length > 0 && (
        <div style={{ marginTop: 24, padding: 16, background: 'var(--color-surface)', borderRadius: 'var(--radius)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>📝 Notas de progresión</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {progressionNotes.map((note, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 90 }}>
      <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function WeekAccordion({ week, index, isOpen, onToggle }: {
  week: PlanWeek;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          border: 'none',
          background: 'var(--color-surface)',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 600,
          textAlign: 'left',
        }}
      >
        <span>
          <span style={{ marginRight: 10, fontSize: '0.85rem', opacity: 0.5 }}>{WEEK_ICONS[index] ?? week.week}</span>
          Semana {week.week} — {week.focus}
        </span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
      </button>

      {isOpen && (
        <div style={{ padding: '12px 20px 20px', borderTop: '1px solid var(--color-border)' }}>
          {week.days.map((day: PlanDay) => (
            <div key={day.day} style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-primary)' }}>
                Día {day.day} — {day.name}
                <span style={{ fontWeight: 400, marginLeft: 8, color: 'var(--color-text-muted)' }}>({day.focus})</span>
              </h4>
              <table style={{
                width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <Th>Ejercicio</Th>
                    <Th>Series</Th>
                    <Th>Reps</Th>
                    <Th>Intensidad</Th>
                    <Th>Peso recomendado</Th>
                  </tr>
                </thead>
                <tbody>
                  {day.exercises.map((ex: PlanExercise) => (
                    <tr key={ex.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <Td>{ex.name}</Td>
                      <Td>{ex.sets}</Td>
                      <Td>{ex.reps}</Td>
                      <Td>{ex.intensityPercent}%</Td>
                      <Td style={{ fontWeight: 600 }}>{ex.recommendedWeight} kg</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{
      textAlign: 'left', padding: '6px 8px', fontWeight: 600, fontSize: '0.75rem',
      textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-text-muted)',
    }}>
      {children}
    </th>
  );
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: '6px 8px', ...style }}>{children}</td>
  );
}
