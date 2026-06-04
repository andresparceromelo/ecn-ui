import { useState, useCallback, useEffect } from 'react';
import type { PerformanceLog, CreateLogRequest, UpdateLogRequest, ListLogsParams, PaginationMeta } from '../types/api.types';
import * as logsService from '../services/logs.service';

interface UseLogsReturn {
  logs: PerformanceLog[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateLogRequest) => Promise<PerformanceLog>;
  update: (id: string, data: UpdateLogRequest) => Promise<PerformanceLog>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<PerformanceLog>;
}

export function useLogs(params?: ListLogsParams): UseLogsReturn {
  const [logs, setLogs] = useState<PerformanceLog[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await logsService.listLogs(params);
      setLogs(response.data);
      setMeta(response.meta);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al cargar registros';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [params?.discipline, params?.page, params?.limit]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const create = useCallback(async (data: CreateLogRequest): Promise<PerformanceLog> => {
    const response = await logsService.createLog(data);
    await fetchLogs();
    return response.data;
  }, [fetchLogs]);

  const update = useCallback(async (id: string, data: UpdateLogRequest): Promise<PerformanceLog> => {
    const response = await logsService.updateLog(id, data);
    await fetchLogs();
    return response.data;
  }, [fetchLogs]);

  const remove = useCallback(async (id: string) => {
    await logsService.deleteLog(id);
    await fetchLogs();
  }, [fetchLogs]);

  const getById = useCallback(async (id: string): Promise<PerformanceLog> => {
    const response = await logsService.getLog(id);
    return response.data;
  }, []);

  return { logs, meta, isLoading, error, refetch: fetchLogs, create, update, remove, getById };
}
