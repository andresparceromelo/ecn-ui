import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as profileService from '../services/profile.service';
import { useAuth } from '../hooks/useAuth';
import type { AthleteLevel, CreateProfileRequest } from '../types/api.types';
import { Spinner } from '../components/common/Spinner';

type Step = 1 | 2 | 3;
type Lift = 'squat' | 'press' | 'deadlift';
type BrzyckiField = `${Lift}Weight` | `${Lift}Reps`;
type ProfileOneRmField = 'squat1RM' | 'press1RM' | 'deadlift1RM';

interface BrzyckiState {
  squatWeight: number;
  squatReps: number;
  pressWeight: number;
  pressReps: number;
  deadliftWeight: number;
  deadliftReps: number;
}

interface ClinicalFeedback {
  swr: string;
  ffmi: string;
  level: AthleteLevel | 'N/A';
}

const LIFTS: Lift[] = ['squat', 'press', 'deadlift'];

const LIFT_LABELS: Record<Lift, string> = {
  squat: 'Sentadilla',
  press: 'Press de banca',
  deadlift: 'Peso muerto',
};

const LIFT_FIELDS: Record<Lift, { weight: BrzyckiField; reps: BrzyckiField; oneRm: ProfileOneRmField }> = {
  squat: { weight: 'squatWeight', reps: 'squatReps', oneRm: 'squat1RM' },
  press: { weight: 'pressWeight', reps: 'pressReps', oneRm: 'press1RM' },
  deadlift: { weight: 'deadliftWeight', reps: 'deadliftReps', oneRm: 'deadlift1RM' },
};

function getApiMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object') {
    if ('response' in error && error.response) {
      const resp = error.response as { data?: { message?: string } };
      if (resp.data && typeof resp.data.message === 'string') {
        return resp.data.message;
      }
    }
    if ('message' in error && typeof (error as Record<string, unknown>).message === 'string') {
      return (error as Record<string, unknown>).message as string;
    }
  }
  return fallback;
}

function calculate1RM(weight: number, reps: number): number {
  if (weight <= 0 || reps <= 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight / (1.0278 - 0.0278 * reps));
}

function nextStep(currentStep: Step): Step {
  return currentStep === 1 ? 2 : 3;
}

function previousStep(currentStep: Step): Step {
  return currentStep === 3 ? 2 : 1;
}

function validateProfile(data: CreateProfileRequest): string | null {
  if (data.height < 100 || data.height > 250) return 'La estatura debe estar entre 100 y 250 cm.';
  if (data.weight <= 0) return 'El peso debe ser mayor que 0 kg.';
  if (data.bodyFat !== undefined && (data.bodyFat <= 0 || data.bodyFat > 100)) return 'La grasa corporal debe estar entre 1% y 100%.';
  if (data.experienceMonths < 0) return 'Los meses de entrenamiento no pueden ser negativos.';
  if (data.squat1RM <= 0) return 'Completa la sentadilla con peso y repeticiones mayores que 0.';
  if (data.press1RM <= 0) return 'Completa el press de banca con peso y repeticiones mayores que 0.';
  if (data.deadlift1RM <= 0) return 'Completa el peso muerto con peso y repeticiones mayores que 0.';
  return null;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setHasProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateProfileRequest>({
    experienceMonths: 0,
    height: 175,
    weight: 70,
    bodyFat: 15,
    squat1RM: 0,
    press1RM: 0,
    deadlift1RM: 0,
  });

  const [brzycki, setBrzycki] = useState<BrzyckiState>({
    squatWeight: 0,
    squatReps: 0,
    pressWeight: 0,
    pressReps: 0,
    deadliftWeight: 0,
    deadliftReps: 0,
  });

  const handleBrzyckiChange = (field: BrzyckiField, value: number) => {
    setBrzycki((prev) => {
      const next = { ...prev, [field]: value };
      setFormData((current) => ({
        ...current,
        squat1RM: calculate1RM(next.squatWeight, next.squatReps),
        press1RM: calculate1RM(next.pressWeight, next.pressReps),
        deadlift1RM: calculate1RM(next.deadliftWeight, next.deadliftReps),
      }));
      return next;
    });
  };

  const feedback = useMemo<ClinicalFeedback>(() => {
    const { weight, height, bodyFat, squat1RM, press1RM, deadlift1RM, experienceMonths } = formData;
    if (weight <= 0 || height <= 0) return { swr: '0.00', ffmi: '0.00', level: 'N/A' };

    const heightMeters = height / 100;
    const leanMass = weight * (1 - (bodyFat ?? 15) / 100);
    const ffmi = leanMass / (heightMeters * heightMeters) + 6.1 * (1.8 - heightMeters);
    const swr = (squat1RM + press1RM + deadlift1RM) / weight;

    let score = 0;
    if (swr >= 5.5) score += 60;
    else if (swr >= 4.0) score += 45;
    else if (swr >= 2.5) score += 25;
    else score += 10;

    if (ffmi >= 23.5) score += 25;
    else if (ffmi >= 21.5) score += 18;
    else if (ffmi >= 19.5) score += 10;
    else score += 5;

    if (experienceMonths >= 60) score += 15;
    else if (experienceMonths >= 36) score += 10;
    else if (experienceMonths >= 12) score += 5;
    else score += 2;

    let level: AthleteLevel = 'BEGINNER';
    if (score >= 85) level = 'ELITE';
    else if (score >= 65) level = 'ADVANCED';
    else if (score >= 35) level = 'INTERMEDIATE';

    return { swr: swr.toFixed(2), ffmi: ffmi.toFixed(2), level };
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(nextStep);
      return;
    }

    const validationError = validateProfile(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await profileService.createProfile(formData);
      setHasProfile(true);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(getApiMessage(err, 'Error al completar el onboarding'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Bienvenido a ECN</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Completa tu perfil clinico para personalizar tu experiencia.</p>

        <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'center' }}>
          {[1, 2, 3].map((progressStep) => (
            <div
              key={progressStep}
              style={{
                height: 4,
                width: 40,
                borderRadius: 2,
                background: progressStep <= step ? 'var(--color-primary)' : 'var(--color-border)',
              }}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="onboarding-card">
        {error && (
          <div style={{ color: 'var(--color-danger)', marginBottom: 20, padding: 12, background: 'rgba(239,68,68,0.1)', borderRadius: 4 }} role="alert">
            {error}
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>Paso 1: Biometria y experiencia</h2>

            <div style={inputGroup}>
              <label htmlFor="height">Estatura (cm)</label>
              <input id="height" type="number" required min="100" max="250" value={formData.height || ''} onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })} />
            </div>

            <div style={inputGroup}>
              <label htmlFor="weight">Peso (kg)</label>
              <input id="weight" type="number" required min="30" max="200" step="0.1" value={formData.weight || ''} onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })} />
            </div>

            <div style={inputGroup}>
              <label htmlFor="bodyFat">Grasa corporal (%) - Opcional</label>
              <input
                id="bodyFat"
                type="number"
                min="3"
                max="50"
                step="0.1"
                value={formData.bodyFat ?? ''}
                onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value === '' ? undefined : Number(e.target.value) })}
              />
            </div>

            <div style={inputGroup}>
              <label htmlFor="experienceMonths">Meses de entrenamiento</label>
              <input id="experienceMonths" type="number" required min="0" value={formData.experienceMonths || ''} onChange={(e) => setFormData({ ...formData, experienceMonths: Number(e.target.value) })} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>Paso 2: Registro de 1RM (fuerza)</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 10 }}>Si no conoces tu 1RM, ingresa tu mejor levantamiento y lo calcularemos con la formula de Brzycki.</p>

            {LIFTS.map((lift) => {
              const fields = LIFT_FIELDS[lift];
              return (
                <div key={lift} className="onboarding-lift-card">
                  <h3 style={{ marginBottom: 12, fontSize: '1rem' }}>{LIFT_LABELS[lift]}</h3>
                  <div className="onboarding-lift-grid">
                    <div style={{ ...inputGroup }}>
                      <label htmlFor={fields.weight}>Peso levantado (kg)</label>
                      <input id={fields.weight} type="number" min="1" required value={brzycki[fields.weight] || ''} onChange={(e) => handleBrzyckiChange(fields.weight, Number(e.target.value))} />
                    </div>
                    <div style={{ ...inputGroup }}>
                      <label htmlFor={fields.reps}>Repeticiones</label>
                      <input id={fields.reps} type="number" min="1" max="15" required value={brzycki[fields.reps] || ''} onChange={(e) => handleBrzyckiChange(fields.reps, Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    1RM calculado: {formData[fields.oneRm]} kg
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>Paso 3: Feedback clinico</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Estos son tus marcadores basales proyectados:</p>

            <div className="onboarding-stats-grid">
              <div style={statBox}>
                <div style={statLabel}>SWR (fuerza relativa)</div>
                <div style={statValue}>{feedback.swr}x</div>
              </div>
              <div style={statBox}>
                <div style={statLabel}>FFMI (masa magra)</div>
                <div style={statValue}>{feedback.ffmi}</div>
              </div>
              <div style={{ ...statBox, gridColumn: '1 / -1', background: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' }}>
                <div style={{ ...statLabel, color: 'var(--color-primary-dark)' }}>Nivel proyectado</div>
                <div style={{ ...statValue, color: 'var(--color-primary-dark)' }}>{feedback.level}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', textAlign: 'center', opacity: 0.7, marginTop: 10 }}>Al finalizar, estos datos quedaran registrados y desbloquearan tu acceso completo a la plataforma.</p>
          </div>
        )}

        <div className="onboarding-actions">
          {step > 1 && (
            <button type="button" onClick={() => setStep(previousStep)} style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer', flex: 1, fontWeight: 600 }}>
              Volver
            </button>
          )}
          <button type="submit" disabled={isLoading} style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', flex: 2, fontWeight: 600, display: 'flex', justifyContent: 'center' }}>
            {isLoading ? <Spinner size={20} /> : step === 3 ? 'Finalizar y entrar' : 'Siguiente'}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputGroup = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 6,
};

const statBox = {
  padding: 16,
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  textAlign: 'center' as const,
  background: 'var(--color-surface-hover)',
};

const statLabel = {
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: 0.5,
  marginBottom: 4,
  color: 'var(--color-text-secondary)',
};

const statValue = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--color-text)',
};
