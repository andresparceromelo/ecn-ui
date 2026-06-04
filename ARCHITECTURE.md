# ARCHITECTURE.md - Estructura del Frontend

## Arquitectura

ECN UI usa React 18, TypeScript estricto, Vite y Axios. El frontend consume solo la API propia del backend `ecn-server` bajo `VITE_API_URL`.

```
pages
  -> hooks
     -> services
        -> API backend
```

## Directorios

```
src/
  components/
    admin/       # AdminMetrics y UI del panel admin
    auth/        # LoginForm, RegisterForm
    common/      # Button, Input, Spinner, EmptyState, ErrorBanner, ConfirmModal
    layout/      # AppLayout
    logs/        # LogForm, LogList, LogCard
    profile/     # ProfileCard, ProfileForm
  context/       # AuthContext
  hooks/         # useAuth, useProfile, useLogs, useAdmin
  pages/         # Login, Register, Onboarding, Dashboard, Form, Profile, Admin, 404
  routes/        # AppRouter y guards
  services/      # Axios instance y servicios HTTP
  styles/        # CSS global responsive
  types/         # Tipos API compartidos
  utils/         # Storage helpers
```

## Reglas de capa

- `pages/` orquestan hooks y componentes.
- `hooks/` manejan estado, fetching y acciones reutilizables.
- `services/` contienen llamadas HTTP tipadas con Axios.
- `components/` reciben props y renderizan UI; no hacen llamadas API.
- `types/` concentra contratos de auth, perfil de atleta, logs, admin y API wrappers.

## Rutas

- `/` landing.
- `/login` y `/register` bajo `GuestRoute`.
- `/onboarding` bajo `OnboardingRoute`.
- `/dashboard`, `/create`, `/edit/:id` y `/profile` bajo `PrivateRoute`.
- `/admin` bajo `AdminRoute`.
- `*` renderiza 404.

## Sesion

- Token JWT: `localStorage["ecn_token"]`.
- Usuario cacheado: `localStorage["ecn_user"]`.
- Axios agrega bearer token en cada request.
- 401 limpia token y usuario, luego redirige a `/login`.

## Contratos principales

- Auth: `POST /auth/register`, `POST /auth/login`.
- Perfil: `GET /athletes/profile`, `POST /athletes/profile`.
- Logs: `GET /logs`, `GET /logs/:id`, `POST /logs`, `PUT /logs/:id`, `DELETE /logs/:id`.
- Admin: `GET /admin/dashboard`.

## Verificacion

Antes de entregar:

```bash
npm run typecheck
npm run build
rg -n "\bany\b|console\.|alert\(|confirm\(|prompt\(" src
```
