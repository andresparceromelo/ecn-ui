import { useState, useEffect } from 'react';
import type { CreateLogRequest, UpdateLogRequest, PerformanceLog, Discipline } from '../../types/api.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface Props {
  initialData?: PerformanceLog;
  onSubmit: (data: CreateLogRequest | UpdateLogRequest) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  mode: 'create' | 'edit';
  preselectedDiscipline?: Discipline;
}

const DISCIPLINES: Discipline[] = ['WEIGHTLIFTING', 'RUNNING', 'SWIMMING', 'CYCLING'];

interface FieldMeta {
  label: string;
  type: 'text' | 'number' | 'select';
  placeholder?: string;
  step?: string;
  options?: { value: string; label: string }[];
}

type FormConfig = Record<'exerciseName' | 'metricValue' | 'reps', FieldMeta>;

const FORM_CONFIGS: Record<Discipline, FormConfig> = {
  WEIGHTLIFTING: {
    exerciseName: { label: 'Ejercicio', type: 'text', placeholder: 'Ej: Sentadilla, Press banca...' },
    metricValue: { label: 'Carga (kg)', type: 'number', placeholder: 'Ej: 80', step: '0.1' },
    reps: { label: 'Repeticiones', type: 'number', placeholder: 'Ej: 8' },
  },
  RUNNING: {
    exerciseName: {
      label: 'Tipo de carrera', type: 'select',
      options: [
        { value: 'Easy run', label: 'Easy run' },
        { value: 'Tempo', label: 'Tempo' },
        { value: 'Intervals', label: 'Intervals' },
        { value: 'Long run', label: 'Long run' },
        { value: 'Race', label: 'Carrera / competencia' },
      ],
    },
    metricValue: { label: 'Distancia (km)', type: 'number', placeholder: 'Ej: 10', step: '0.1' },
    reps: { label: 'Duración (min)', type: 'number', placeholder: 'Ej: 45' },
  },
  SWIMMING: {
    exerciseName: {
      label: 'Estilo', type: 'select',
      options: [
        { value: 'Freestyle', label: 'Freestyle (crol)' },
        { value: 'Backstroke', label: 'Backstroke (espalda)' },
        { value: 'Breaststroke', label: 'Breaststroke (pecho)' },
        { value: 'Butterfly', label: 'Butterfly (mariposa)' },
        { value: 'IM', label: 'IM (combinado)' },
      ],
    },
    metricValue: { label: 'Distancia (m)', type: 'number', placeholder: 'Ej: 1500' },
    reps: { label: 'Duración (min)', type: 'number', placeholder: 'Ej: 30' },
  },
  CYCLING: {
    exerciseName: {
      label: 'Tipo de rodada', type: 'select',
      options: [
        { value: 'Road', label: 'Road (carretera)' },
        { value: 'MTB', label: 'MTB (montaña)' },
        { value: 'Indoor', label: 'Indoor (bicicleta fija)' },
        { value: 'Commute', label: 'Commute (traslado)' },
      ],
    },
    metricValue: { label: 'Distancia (km)', type: 'number', placeholder: 'Ej: 40', step: '0.1' },
    reps: { label: 'Duración (min)', type: 'number', placeholder: 'Ej: 90' },
  },
};

export function LogForm({ initialData, onSubmit, isLoading, serverError, mode, preselectedDiscipline }: Props) {
  const [discipline, setDiscipline] = useState<Discipline>(preselectedDiscipline ?? initialData?.discipline as Discipline ?? 'WEIGHTLIFTING');
  const [exerciseName, setExerciseName] = useState(initialData?.exerciseName ?? '');
  const [metricValue, setMetricValue] = useState(initialData?.metricValue.toString() ?? '');
  const [reps, setReps] = useState(initialData?.reps.toString() ?? '');
  const [loggedAt, setLoggedAt] = useState(initialData?.loggedAt ? initialData.loggedAt.slice(0, 10) : new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const effectiveDiscipline = mode === 'create' && preselectedDiscipline ? preselectedDiscipline : discipline;
  const config = FORM_CONFIGS[effectiveDiscipline];

  useEffect(() => {
    if (initialData) {
      setDiscipline(initialData.discipline as Discipline);
      setExerciseName(initialData.exerciseName);
      setMetricValue(initialData.metricValue.toString());
      setReps(initialData.reps.toString());
      setLoggedAt(initialData.loggedAt.slice(0, 10));
    }
  }, [initialData]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!exerciseName.trim()) next.exerciseName = 'Este campo es obligatorio';
    if (!metricValue || Number(metricValue) <= 0) next.metricValue = 'Debe ser un número positivo';
    if (!reps || Number(reps) <= 0) next.reps = 'Debe ser un número positivo';
    if (!loggedAt) next.loggedAt = 'La fecha es obligatoria';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      discipline: effectiveDiscipline,
      exerciseName: exerciseName.trim(),
      metricValue: Number(metricValue),
      reps: Number(reps),
      loggedAt: new Date(loggedAt).toISOString(),
    };
    onSubmit(data);
  }

  function renderField(key: 'exerciseName' | 'metricValue' | 'reps', meta: FieldMeta) {
    const value = key === 'exerciseName' ? exerciseName : key === 'metricValue' ? metricValue : reps;
    const setter = key === 'exerciseName' ? setExerciseName : key === 'metricValue' ? setMetricValue : setReps;

    if (meta.type === 'select') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }} key={key}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }} htmlFor={`field-${key}`}>{meta.label}</label>
          <select
            id={`field-${key}`}
            value={value}
            onChange={(e) => setter(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${errors[key] ? 'var(--color-danger)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius)',
              fontSize: '0.9rem',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
            aria-invalid={!!errors[key]}
          >
            {meta.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors[key] && (
            <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem' }} role="alert">{errors[key]}</span>
          )}
        </div>
      );
    }

    return (
      <Input
        key={key}
        label={meta.label}
        type={meta.type === 'number' ? 'number' : 'text'}
        value={value}
        onChange={(e) => setter(e.target.value)}
        error={errors[key]}
        placeholder={meta.placeholder}
        step={meta.step}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
      {serverError && (
        <div style={{ background: '#fef2f2', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius)', padding: 12, color: 'var(--color-danger)', fontSize: '0.85rem' }} role="alert">
          {serverError}
        </div>
      )}

      {mode === 'edit' || !preselectedDiscipline ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }} htmlFor="discipline">Disciplina</label>
          <select
            id="discipline"
            value={discipline}
            onChange={(e) => {
              setDiscipline(e.target.value as Discipline);
              setErrors({});
            }}
            style={{
              padding: '10px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              fontSize: '0.9rem',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          >
            {DISCIPLINES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      ) : null}

      {renderField('exerciseName', config.exerciseName)}
      {renderField('metricValue', config.metricValue)}
      {renderField('reps', config.reps)}

      <Input label="Fecha" type="date" value={loggedAt} onChange={(e) => setLoggedAt(e.target.value)} error={errors.loggedAt} />

      <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
        {mode === 'create' ? 'Guardar registro' : 'Actualizar registro'}
      </Button>
    </form>
  );
}
