import { createContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import type { AuthUser, RegisterRequest, LoginRequest } from '../types/api.types';
import * as authService from '../services/auth.service';
import * as profileService from '../services/profile.service';
import { getToken, setToken, getStoredUser, setStoredUser, clearSession } from '../utils/storage';

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
  hasProfile: boolean | null;
  isLoadingProfile: boolean;
  setHasProfile: (val: boolean) => void;
  updateAvatar: (url: string) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser<AuthUser>());
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Ref to prevent the on-mount effect from re-running after login (login sets user → effect would double-call)
  const didInitialCheck = useRef(false);

  const checkAthleteProfile = useCallback(async (currentUser: AuthUser | null) => {
    if (currentUser && currentUser.role === 'ATHLETE') {
      setIsLoadingProfile(true);
      try {
        const res = await profileService.getProfile();
        const found = 'hasProfile' in res.data ? res.data.hasProfile : !!res.data;
        setHasProfile(found);
      } catch {
        // 404 or any error → no profile
        setHasProfile(false);
      } finally {
        setIsLoadingProfile(false);
      }
    } else if (currentUser && currentUser.role === 'ADMIN') {
      // Admins are always considered to have a "profile" (skip onboarding)
      setHasProfile(true);
    } else {
      setHasProfile(null);
    }
  }, []);

  // Run ONLY on initial mount to restore state after a page refresh
  useEffect(() => {
    if (!didInitialCheck.current) {
      didInitialCheck.current = true;
      if (user) {
        checkAthleteProfile(user);
      }
    }
  }, [checkAthleteProfile, user]);

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.loginUser(data);
      const { user: userData, token: tokenData } = response.data;
      setToken(tokenData);
      setStoredUser(userData);
      setTokenState(tokenData);
      setUser(userData);
      // Check profile status immediately after login so Guards have correct state before navigation
      await checkAthleteProfile(userData);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [checkAthleteProfile]);

  const register = useCallback(async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.registerUser(data);
      const { user: userData, token: tokenData } = response.data;
      setToken(tokenData);
      setStoredUser(userData);
      setTokenState(tokenData);
      setUser(userData);
      // New users always have no profile after registering
      if (userData.role === 'ATHLETE') {
        setHasProfile(false);
      } else {
        setHasProfile(true);
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setTokenState(null);
    setError(null);
    setHasProfile(null);
    didInitialCheck.current = false;
    window.location.href = '/login';
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const updateAvatar = useCallback((url: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, avatarUrl: url };
      setStoredUser(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'ADMIN',
        isLoading,
        login,
        register,
        logout,
        error,
        clearError,
        hasProfile,
        isLoadingProfile,
        setHasProfile,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
