// ─── Auth ─────────────────────────────────────
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ATHLETE' | 'ADMIN';
  avatarUrl: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// ─── Athlete Profile ──────────────────────────
export type AthleteLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';

export interface CreateProfileRequest {
  experienceMonths: number;
  height: number;
  weight: number;
  bodyFat?: number;
  squat1RM: number;
  press1RM: number;
  deadlift1RM: number;
}

export interface AthleteProfile {
  id: string;
  level: AthleteLevel;
  experienceMonths: number;
  height: number;
  weight: number;
  bodyFat: number;
  ffmi: number;
  swr: number;
  squat1RM: number;
  press1RM: number;
  deadlift1RM: number;
  hasProfile: true;
  createdAt: string;
  updatedAt: string;
}

export interface NoProfile {
  hasProfile: false;
  profile: null;
}

export type ProfileResponse = AthleteProfile | NoProfile;

// ─── Performance Logs ─────────────────────────
export type Discipline = 'WEIGHTLIFTING' | 'RUNNING' | 'SWIMMING' | 'CYCLING';

export interface CreateLogRequest {
  discipline: Discipline;
  exerciseName: string;
  metricValue: number;
  reps: number;
  loggedAt: string;
}

export interface UpdateLogRequest {
  discipline?: Discipline;
  exerciseName?: string;
  metricValue?: number;
  reps?: number;
  loggedAt?: string;
}

export interface PerformanceLog {
  id: string;
  discipline: string;
  exerciseName: string;
  metricValue: number;
  reps: number;
  loggedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Admin ─────────────────────────────────────
export interface DashboardData {
  totalAthletes: number;
  totalLogs: number;
  logsThisWeek: number;
  averageLogsPerAthlete: number;
}

// ─── API Wrappers ─────────────────────────────
export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  error: true;
  message: string;
  statusCode: number;
}

export interface ListLogsParams {
  discipline?: string;
  page?: number;
  limit?: number;
}

// ─── Plan de Entrenamiento ─────────────────────
export interface PlanExercise {
  name: string;
  sets: number;
  reps: number;
  intensityPercent: number;
  recommendedWeight: number;
}

export interface PlanDay {
  day: number;
  name: string;
  focus: string;
  exercises: PlanExercise[];
}

export interface PlanWeek {
  week: number;
  focus: string;
  days: PlanDay[];
}

export interface PlanResponse {
  athlete: { name: string; level: string; experienceMonths: number | null };
  generatedAt: string;
  discipline: string;
  reference1RM: { squat: number | null; press: number | null; deadlift: number | null };
  weeks: PlanWeek[];
  progressionNotes: string[];
}

export type Tab = 'WEIGHTLIFTING' | 'RUNNING' | 'SWIMMING' | 'CYCLING';

// ─── Admin Charts ──────────────────────────────
export interface ChartItem {
  name: string;
  value: number;
}

export interface AdminChartsData {
  logsByDiscipline: { discipline: string; count: number }[];
  logsByMonth: { month: string; count: number }[];
  athletesByLevel: { level: string; count: number }[];
  usersByRole: { role: string; count: number }[];
}

// ─── Athlete Stats ─────────────────────────────
export interface AthleteStatsData {
  logsByMonth: { month: string; count: number }[];
  logsByDiscipline: { discipline: string; count: number }[];
  totalLogs: number;
}
