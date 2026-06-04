import { useState, useCallback, useEffect } from 'react';
import type { PlanResponse } from '../types/api.types';
import * as planService from '../services/plan.service';

interface UsePlanReturn {
  plan: PlanResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePlan(discipline: string = 'WEIGHTLIFTING'): UsePlanReturn {
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await planService.getPlan(discipline);
      setPlan(response.data);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        (err as Error).message ??
        'Error al cargar el plan';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [discipline]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  return { plan, isLoading, error, refetch: fetchPlan };
}
