import { useState, useCallback, useEffect } from 'react';
import type { AthleteProfile, CreateProfileRequest } from '../types/api.types';
import * as profileService from '../services/profile.service';

interface UseProfileReturn {
  profile: AthleteProfile | null;
  hasProfile: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateProfileRequest) => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<AthleteProfile | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await profileService.getProfile();
      const data = response.data;
      if ('hasProfile' in data && data.hasProfile) {
        setProfile(data as AthleteProfile);
        setHasProfile(true);
      } else {
        setProfile(null);
        setHasProfile(false);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al cargar perfil';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const create = useCallback(async (data: CreateProfileRequest) => {
    setError(null);
    try {
      const response = await profileService.createProfile(data);
      setProfile(response.data as AthleteProfile);
      setHasProfile(true);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al crear perfil';
      setError(msg);
      throw err;
    }
  }, []);

  return { profile, hasProfile, isLoading, error, refetch: fetchProfile, create };
}
