# AGENTS.md — Perfil de Agente Frontend

## Identidad

**Rol:** Ingeniero de Software Frontend de nivel Staff  
**Stack:** React 18+ · TypeScript 5+ · Vite 5+ · Axios  
**Repositorio:** `ecn-ui` — Frontend de plataforma ECN (E-Commerce Network)  
**Idioma de trabajo:** TypeScript estricto. Prohibido JavaScript puro.

## Principios de Diseño (Innegociables)

1. **Separación de Lógica y UI**
   - `pages/` → orquestan hooks y componentes.
   - `hooks/` → toda la lógica de estado, fetching, y negocio reutilizable.
   - `components/` → componentes puros, sin efectos ni llamadas a API. Solo reciben props y renderizan.
   - `services/` → llamadas HTTP centralizadas con Axios. Los hooks consumen servicios, nunca Axios directamente.

2. **Estados de UI Obligatorios**
   - **Loading:** Spinner/skeleton mientras se resuelve la petición.
   - **Empty State:** Mensaje e icono cuando la data llega vacía (array vacío, null, etc.).
   - **Error:** Banner o toast amigable con el mensaje del backend. Sin `alert()`.
   - **Success:** Feedback visual de operación exitosa.

3. **Responsive Design**
   - Mobile-first. Breakpoints: 640px, 768px, 1024px, 1280px.
   - Layout con CSS Grid y Flexbox. Sin frameworks de CSS (Tailwind permitido para utilidades, no componentes).

4. **Tipado Estricto**
   - `types/` contiene interfaces para cada respuesta de API y cada estado de UI.
   - Prohibido `any` como tipo generalizado. Uso de `unknown` cuando el tipo es incierto.
   - `as` casteos permitidos solo en casos muy acotados (ej. tipado de eventos nativos).

5. **Manejo de Sesión**
   - JWT almacenado en `localStorage` con clave `ecn_token`.
   - Interceptor de Axios inyecta `Authorization: Bearer <token>` en cada request.
   - Interceptor de respuesta: si recibe 401 → limpia token y redirige a `/login`.
   - Logout → `localStorage.removeItem('ecn_token')` y redirige a `/login`.

6. **Protección de Rutas**
   - `<PrivateRoute>`: si no hay token, redirige a `/login`.
   - `<AdminRoute>`: si el rol no es `admin`, redirige a `/dashboard`.
   - `<GuestRoute>`: si hay sesión activa, redirige al dashboard.
   - Página `404` para rutas no definidas.

## Pasos Secuenciales de Implementación

Para cumplir la rúbrica de evaluación en orden:

### Fase 1 — Fundación (Día 1)
1. Inicializar proyecto con `npm create vite@latest ecn-ui -- --template react-ts`.
2. Instalar dependencias: `axios`, `react-router-dom`.
3. Crear estructura de directorios: `services/`, `hooks/`, `components/`, `pages/`, `types/`, `utils/`, `context/`.
4. Configurar variables de entorno: `VITE_API_URL=http://localhost:3000/api`.
5. Configurar Axios instance con interceptores (token, 401 → logout).

### Fase 2 — Autenticación (Día 1-2)
6. Implementar `AuthContext` con valores: `user`, `token`, `login()`, `register()`, `logout()`, `isAuthenticated`, `isAdmin`.
7. Crear tipos: `User`, `LoginRequest`, `LoginResponse`, `RegisterRequest`, `ApiError`.
8. Crear `services/auth.service.ts` con funciones `login()`, `register()`, `getProfile()`.
9. Crear `hooks/useAuth.ts` que expone el contexto.
10. Crear páginas `LoginPage` y `RegisterPage` con formularios controlados.
11. Mostrar errores del backend por campo (ej. "El email ya está registrado" bajo el input de email).
12. Implementar `PrivateRoute`, `AdminRoute`, `GuestRoute`.

### Fase 3 — Vistas Principales (Día 2-3)
13. Crear `DashboardPage` con listado principal de registros de entrenamiento.
14. Estados: loading, empty, error, success.
15. Crear `FormPage` para crear/editar entidades.
16. Crear `AdminPage` con panel de administración (CRUD, gestión de usuarios).
17. Crear `DetailPage` (opcional si admin ya cubre detalle).
18. Implementar `NotFoundPage` (404).

### Fase 4 — Refinamiento (Día 3-4)
19. Verificar responsive en 4 breakpoints.
20. Auditar accesibilidad: labels en inputs, contraste, roles ARIA.
21. Eliminar `console.log`, código muerto, y `any` residuales.
22. `tsc --noEmit` sin errores.
23. `npm run build` exitoso.

### Fase 5 — Verificación contra Rúbrica (Día 4)
24. Autoevaluar contra cada criterio de la rúbrica (40 pts totales).
25. Corregir cualquier penalización detectada.
