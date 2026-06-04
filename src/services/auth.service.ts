import api from './axios.instance';
import type { RegisterRequest, LoginRequest, AuthResponse, ApiResponse } from '../types/api.types';

export function registerUser(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
  return api.post('/auth/register', data).then((res) => res.data);
}

export function loginUser(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  return api.post('/auth/login', data).then((res) => res.data);
}
