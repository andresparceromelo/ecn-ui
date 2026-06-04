import { useState, useCallback, useEffect } from 'react';
import type { AdminChartsData } from '../types/api.types';
import * as adminService from '../services/admin.service';

interface UseAdminChartsReturn {
  data: AdminChartsData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAdminCharts(): UseAdminChartsReturn {
  const [data, setData] = useState<AdminChartsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await adminService.getCharts();
      setData(response.data);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al cargar gráficas';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  return { data, isLoading, error, refetch: fetchCharts };
}
