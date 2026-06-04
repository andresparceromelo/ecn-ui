import type { Tab } from '../../types/api.types';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { tab: Tab; label: string; icon: string }[] = [
  { tab: 'WEIGHTLIFTING', label: 'Weightlifting', icon: '🏋️' },
  { tab: 'RUNNING', label: 'Running', icon: '🏃' },
  { tab: 'SWIMMING', label: 'Swimming', icon: '🏊' },
  { tab: 'CYCLING', label: 'Cycling', icon: '🚴' },
];

export function Sidebar({ activeTab, onTabChange }: Props) {
  return (
    <nav
      style={{
        width: 220,
        flexShrink: 0,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <div style={{ padding: '8px 16px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-text-muted)' }}>
        Disciplinas
      </div>
      {TABS.map(({ tab, label, icon }) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            border: 'none',
            background: tab === activeTab ? 'var(--color-bg)' : 'transparent',
            color: tab === activeTab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: tab === activeTab ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderRight: tab === activeTab ? '3px solid var(--color-primary)' : '3px solid transparent',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}
