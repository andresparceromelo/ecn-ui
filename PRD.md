# PRD - ECN UI

## 1. Resumen

ECN es una plataforma web de analisis deportivo para atletas. El MVP se centra en weightlifting: registro de usuario, onboarding clinico, calculo de nivel inicial y bitacora de entrenamientos consumiendo exclusivamente la API propia `ecn-server`.

## 2. Roles

| Rol | Descripcion |
| --- | --- |
| `ATHLETE` | Completa onboarding, consulta su perfil y gestiona sus registros de entrenamiento. |
| `ADMIN` | Accede al panel de metricas globales del sistema. |

## 3. Vistas requeridas

### Login (`/login`)
- Formulario con email y password.
- Validacion cliente y errores backend sin `alert()`.
- Si hay sesion activa, redirige al dashboard.

### Registro (`/register`)
- Formulario con nombre, email, password y confirmacion.
- Registro exitoso guarda JWT y envia al onboarding.
- Email duplicado y validaciones se muestran en UI.

### Onboarding (`/onboarding`)
- Captura experiencia, estatura en cm, peso, grasa corporal opcional y marcas de fuerza.
- Calcula 1RM estimado con Brzycki cuando el atleta ingresa peso y repeticiones.
- Muestra feedback basal: SWR, FFMI y nivel proyectado.
- Envia `POST /api/v1/athletes/profile`; el backend calcula y persiste el perfil.

### Dashboard (`/dashboard`)
- Lista registros de entrenamiento paginados desde `GET /api/v1/logs`.
- Permite filtrar por disciplina, crear, editar y eliminar logs.
- Maneja loading, empty, error y success.

### Formulario de Log (`/create`, `/edit/:id`)
- Crea o edita registros con disciplina, ejercicio, carga, repeticiones y fecha.
- Usa confirmacion visual y mensajes de error del backend.

### Perfil (`/profile`)
- Muestra el perfil de atleta creado en onboarding.
- El perfil inicial es de solo lectura mientras el backend no exponga endpoint de actualizacion.

### Admin (`/admin`)
- Protegido para rol `ADMIN`.
- Consume `GET /api/v1/admin/dashboard` y muestra metricas globales.

### 404 (`/*`)
- Muestra pagina no encontrada y permite volver al inicio.

## 4. Reglas de negocio

- JWT en `localStorage` con clave `ecn_token`.
- Interceptor Axios agrega `Authorization: Bearer <token>`.
- Respuesta 401 limpia sesion y redirige a `/login`.
- Atletas sin perfil van a `/onboarding`.
- Atletas con perfil van a `/dashboard`.
- Admin no requiere onboarding.
- Logs soportan `WEIGHTLIFTING`, `RUNNING`, `SWIMMING` y `CYCLING`.

## 5. Calidad requerida

- TypeScript estricto, sin `any` generalizado.
- Componentes puros en `components/`; hooks para estado/fetching; services para HTTP.
- Sin `console.log`, `alert()`, `confirm()` ni `prompt()`.
- Responsive mobile-first con soporte para 640px, 768px, 1024px y 1280px.
- `npm run typecheck` y `npm run build` deben finalizar sin errores.
