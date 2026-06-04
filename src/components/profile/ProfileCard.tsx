import type { AthleteProfile } from '../../types/api.types';

interface Props {
  profile: AthleteProfile;
}

export function ProfileCard({ profile }: Props) {
  const levelColors: Record<string, string> = {
    BEGINNER: '#dbeafe',
    INTERMEDIATE: '#dcfce7',
    ADVANCED: '#fef3c7',
    ELITE: '#fee2e2',
  };

  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Perfil de atleta</h3>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: '0.8rem',
            fontWeight: 700,
            background: levelColors[profile.level] ?? '#e2e8f0',
            color: '#1e293b',
          }}
        >
          {profile.level}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Detail label="Experiencia" value={profile.experienceMonths ? `${profile.experienceMonths} meses` : '-'} />
        <Detail label="Altura" value={profile.height ? `${profile.height} cm` : '-'} />
        <Detail label="Peso" value={profile.weight ? `${profile.weight} kg` : '-'} />
        <Detail label="Grasa corporal" value={profile.bodyFat ? `${profile.bodyFat}%` : '-'} />
        <Detail label="FFMI" value={profile.ffmi ? `${profile.ffmi}` : '-'} />
        <Detail label="SWR" value={profile.swr ? `${profile.swr}x` : '-'} />
        <Detail label="Sentadilla 1RM" value={profile.squat1RM ? `${profile.squat1RM} kg` : '-'} />
        <Detail label="Press banca 1RM" value={profile.press1RM ? `${profile.press1RM} kg` : '-'} />
        <Detail label="Peso muerto 1RM" value={profile.deadlift1RM ? `${profile.deadlift1RM} kg` : '-'} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>{value}</p>
    </div>
  );
}
