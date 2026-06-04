import api from './axios.instance';
import type { AthleteStatsData, ApiResponse } from '../types/api.types';

export function getAthleteStats(): Promise<ApiResponse<AthleteStatsData>> {
  return api.get('/athletes/stats').then((res) => res.data);
}
