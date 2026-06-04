import api from './axios.instance';
import type {
  PerformanceLog,
  CreateLogRequest,
  UpdateLogRequest,
  PaginatedResponse,
  ApiResponse,
  ListLogsParams,
} from '../types/api.types';

export function listLogs(params?: ListLogsParams): Promise<PaginatedResponse<PerformanceLog>> {
  return api.get('/logs', { params }).then((res) => res.data);
}

export function getLog(id: string): Promise<ApiResponse<PerformanceLog>> {
  return api.get(`/logs/${id}`).then((res) => res.data);
}

export function createLog(data: CreateLogRequest): Promise<ApiResponse<PerformanceLog>> {
  return api.post('/logs', data).then((res) => res.data);
}

export function updateLog(id: string, data: UpdateLogRequest): Promise<ApiResponse<PerformanceLog>> {
  return api.put(`/logs/${id}`, data).then((res) => res.data);
}

export function deleteLog(id: string): Promise<void> {
  return api.delete(`/logs/${id}`);
}
