import api from './axios.instance';
import type { ProfileResponse, CreateProfileRequest, ApiResponse } from '../types/api.types';

export function getProfile(): Promise<ApiResponse<ProfileResponse>> {
  return api.get('/athletes/profile').then((res) => res.data);
}

export function createProfile(data: CreateProfileRequest): Promise<ApiResponse<ProfileResponse>> {
  return api.post('/athletes/profile', data).then((res) => res.data);
}

export function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post('/athletes/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data.data);
}
