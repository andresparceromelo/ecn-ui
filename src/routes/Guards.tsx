import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../components/common/Spinner';

const FullScreenLoading = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Spinner size={40} />
  </div>
);

/**
 * PrivateRoute — requires authentication.
 * If the user is an ATHLETE and their profile check is still loading → show spinner.
 * If the user is an ATHLETE and we KNOW there's no profile → redirect to onboarding.
 * hasProfile === null (unknown) passes through so the user isn't blocked by a race condition.
 */
export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, hasProfile, isLoadingProfile } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Only show spinner when we are actively checking the profile for an authenticated athlete
  if (user.role === 'ATHLETE' && isLoadingProfile) {
    return <FullScreenLoading />;
  }

  // Only redirect when we EXPLICITLY know there's no profile (false), not when unknown (null)
  if (user.role === 'ATHLETE' && hasProfile === false) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

/**
 * OnboardingRoute — only for athletes who have NOT completed their profile.
 * Once profile is complete, redirects to dashboard.
 */
export function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, hasProfile, isLoadingProfile } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (isLoadingProfile) return <FullScreenLoading />;

  // If profile already exists, skip onboarding
  if (user.role === 'ATHLETE' && hasProfile === true) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
