import { useState, useCallback, useEffect } from 'react';
import type { AthleteStatsData } from '../types/api.types';
import * as athleteStatsService from '../services/athlete-stats.service';

interface UseAthleteStatsReturn {
  data: AthleteStatsData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAthleteStats(): UseAthleteStatsReturn {
  const [data, setData] = useState<AthleteStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await athleteStatsService.getAthleteStats();
      setData(response.data);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al cargar estadísticas';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, isLoading, error, refetch: fetchStats };
}
