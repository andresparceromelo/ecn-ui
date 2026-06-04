import { useState } from 'react';
import type { CreateProfileRequest, AthleteProfile } from '../../types/api.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface Props {
  initialData?: AthleteProfile | null;
  onSubmit: (data: CreateProfileRequest) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

export function ProfileForm({ initialData, onSubmit, isLoading, serverError }: Props) {
  const [experienceMonths, setExperienceMonths] = useState(initialData?.experienceMonths?.toString() ?? '');
  const [height, setHeight] = useState(initialData?.height?.toString() ?? '');
  const [weight, setWeight] = useState(initialData?.weight?.toString() ?? '');
  const [bodyFat, setBodyFat] = useState(initialData?.bodyFat?.toString() ?? '');
  const [squat1RM, setSquat1RM] = useState(initialData?.squat1RM?.toString() ?? '');
  const [press1RM, setPress1RM] = useState(initialData?.press1RM?.toString() ?? '');
  const [deadlift1RM, setDeadlift1RM] = useState(initialData?.deadlift1RM?.toString() ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!experienceMonths) next.experienceMonths = 'Los meses de experiencia son obligatorios';
    else if (Number(experienceMonths) < 0) next.experienceMonths = 'No puede ser negativo';
    if (!height) next.height = 'La altura es obligatoria';
    else if (Number(height) <= 0) next.height = 'Debe ser un numero positivo';
    if (!weight) next.weight = 'El peso es obligatorio';
    else if (Number(weight) <= 0) next.weight = 'Debe ser un numero positivo';
    if (bodyFat && Number(bodyFat) <= 0) next.bodyFat = 'Debe ser un numero positivo';
    if (!squat1RM) next.squat1RM = 'La sentadilla 1RM es obligatoria';
    else if (Number(squat1RM) <= 0) next.squat1RM = 'Debe ser un numero positivo';
    if (!press1RM) next.press1RM = 'El press 1RM es obligatorio';
    else if (Number(press1RM) <= 0) next.press1RM = 'Debe ser un numero positivo';
    if (!deadlift1RM) next.deadlift1RM = 'El peso muerto 1RM es obligatorio';
    else if (Number(deadlift1RM) <= 0) next.deadlift1RM = 'Debe ser un numero positivo';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const data: CreateProfileRequest = {
      experienceMonths: Number(experienceMonths),
      height: Number(height),
      weight: Number(weight),
      ...(bodyFat ? { bodyFat: Number(bodyFat) } : {}),
      squat1RM: Number(squat1RM),
      press1RM: Number(press1RM),
      deadlift1RM: Number(deadlift1RM),
    };
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
      {serverError && (
        <div style={{ background: '#fef2f2', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius)', padding: 12, color: 'var(--color-danger)', fontSize: '0.85rem' }} role="alert">
          {serverError}
        </div>
      )}

      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: 8 }}>Datos generales</h3>
      <Input label="Meses de experiencia" type="number" value={experienceMonths} onChange={(e) => setExperienceMonths(e.target.value)} error={errors.experienceMonths} placeholder="Ej: 12" />
      <Input label="Altura (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} error={errors.height} placeholder="Ej: 175" step="0.1" />
      <Input label="Peso (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} error={errors.weight} placeholder="Ej: 78.5" step="0.1" />
      <Input label="Grasa corporal (%)" type="number" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} error={errors.bodyFat} placeholder="Ej: 15" step="0.1" />

      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: 8 }}>Estimacion 1RM</h3>
      <Input label="Sentadilla (kg)" type="number" value={squat1RM} onChange={(e) => setSquat1RM(e.target.value)} error={errors.squat1RM} placeholder="Ej: 120" step="0.1" />
      <Input label="Press banca (kg)" type="number" value={press1RM} onChange={(e) => setPress1RM(e.target.value)} error={errors.press1RM} placeholder="Ej: 65" step="0.1" />
      <Input label="Peso muerto (kg)" type="number" value={deadlift1RM} onChange={(e) => setDeadlift1RM(e.target.value)} error={errors.deadlift1RM} placeholder="Ej: 140" step="0.1" />

      <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
        Guardar perfil
      </Button>
    </form>
  );
}
