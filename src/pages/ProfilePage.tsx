import { useRef, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { ProfileCard } from '../components/profile/ProfileCard';
import { ProfileCharts } from '../components/profile/ProfileCharts';
import { Avatar } from '../components/common/Avatar';
import { Spinner } from '../components/common/Spinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { useProfile } from '../hooks/useProfile';
import { useAthleteStats } from '../hooks/useAthleteStats';
import { useAuth } from '../hooks/useAuth';
import { uploadAvatar } from '../services/profile.service';

export default function ProfilePage() {
  const { profile, hasProfile, isLoading, error, refetch } = useProfile();
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useAthleteStats();
  const { user, updateAvatar: updateAvatarInContext } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const baseUrl = (import.meta.env.VITE_API_URL as string ?? '').replace('/api/v1', '');
  const avatarUrl = user?.avatarUrl ? `${baseUrl}${user.avatarUrl}` : null;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const { avatarUrl: newUrl } = await uploadAvatar(file);
      updateAvatarInContext(newUrl);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Error al subir imagen';
      setUploadError(msg);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  if (isLoading) {
    return (
      <AppLayout>
        <Spinner />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <ErrorBanner message={error} onRetry={refetch} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>Mi perfil de atleta</h1>

        {hasProfile && profile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Avatar section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: 20,
            }}>
              <div style={{ position: 'relative' }}>
                <Avatar src={avatarUrl} name={user?.name ?? ''} size={80} />
                <label
                  htmlFor="avatar-upload"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '2px solid var(--color-surface)',
                    fontSize: '0.8rem',
                    color: '#fff',
                  }}
                >
                  {uploading ? '...' : '📷'}
                </label>
                <input
                  ref={fileRef}
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1rem' }}>{user?.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  {uploading ? 'Subiendo...' : 'Haz clic en la cámara para cambiar tu foto de perfil'}
                </p>
                {uploadError && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-danger)', marginTop: 4 }} role="alert">{uploadError}</p>
                )}
              </div>
            </div>

            <ProfileCard profile={profile} />

            {statsLoading ? (
              <div style={{ padding: 24 }}><Spinner /></div>
            ) : statsError ? (
              <ErrorBanner message={statsError} onRetry={refetchStats} />
            ) : stats ? (
              <ProfileCharts data={stats} />
            ) : null}
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>
              Completa tu perfil desde el onboarding para calcular tu nivel inicial con tus marcas de 1RM.
            </p>
            <button
              type="button"
              onClick={() => window.location.assign('/onboarding')}
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '10px 20px',
                fontWeight: 600,
              }}
            >
              Ir al onboarding
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
