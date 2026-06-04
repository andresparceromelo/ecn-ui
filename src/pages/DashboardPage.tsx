import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Sidebar } from '../components/layout/Sidebar';
import WeightliftingPage from './WeightliftingPage';
import DisciplinePage from './DisciplinePage';
import type { Tab } from '../types/api.types';

const VALID_TABS: Tab[] = ['WEIGHTLIFTING', 'RUNNING', 'SWIMMING', 'CYCLING'];

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab')?.toUpperCase() ?? 'WEIGHTLIFTING';
  const activeTab = VALID_TABS.includes(rawTab as Tab) ? (rawTab as Tab) : 'WEIGHTLIFTING';

  const handleTabChange = (tab: Tab) => {
    setSearchParams({ tab });
  };

  return (
    <AppLayout>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main style={{ flex: 1, padding: '24px 32px', overflow: 'auto' }}>
          {activeTab === 'WEIGHTLIFTING' ? (
            <WeightliftingPage />
          ) : (
            <DisciplinePage discipline={activeTab} />
          )}
        </main>
      </div>
    </AppLayout>
  );
}
