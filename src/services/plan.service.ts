import api from './axios.instance';
import type { PlanResponse, ApiResponse } from '../types/api.types';

export function getPlan(discipline?: string): Promise<ApiResponse<PlanResponse>> {
  return api.get('/athletes/plan', { params: { discipline } }).then((res) => res.data);
}
