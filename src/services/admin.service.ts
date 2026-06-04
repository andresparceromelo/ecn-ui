import api from './axios.instance';
import type { DashboardData, AdminChartsData, ApiResponse } from '../types/api.types';

export function getDashboard(): Promise<ApiResponse<DashboardData>> {
  return api.get('/admin/dashboard').then((res) => res.data);
}

export function getCharts(): Promise<ApiResponse<AdminChartsData>> {
  return api.get('/admin/charts').then((res) => res.data);
}
