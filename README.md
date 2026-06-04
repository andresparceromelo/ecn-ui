# ecn-ui - Frontend ECN Training Platform

Frontend en React + TypeScript + Vite para ECN, una plataforma de analisis deportivo centrada en onboarding clinico, perfil de atleta y registros de entrenamiento. Consume exclusivamente la API REST propia del backend `ecn-server`.

## Requisitos

- Node.js 20+
- npm 10+

## Inicio rapido

```bash
npm install
npm run dev
npm run build
```

## Variables de entorno

| Variable | Valor recomendado | Descripcion |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:3000/api/v1` | URL base de la API REST del backend |

## Comandos disponibles

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Inicia servidor de desarrollo Vite |
| `npm run build` | Compila TypeScript y empaqueta con Vite |
| `npm run preview` | Vista previa del build de produccion |
| `npm run typecheck` | Verifica tipos sin emitir archivos |

## Estructura

```
src/
  services/    # Llamadas HTTP con Axios centralizado
  hooks/       # Estado, fetching y negocio reutilizable
  components/  # Componentes UI puros
  pages/       # Paginas que orquestan hooks y componentes
  types/       # Interfaces y tipos TypeScript estrictos
  context/     # AuthContext
  routes/      # Router y guards
  utils/       # Storage helpers
  styles/      # CSS global y responsive
```

## Reglas clave

- Hooks no renderizan JSX.
- Componentes no hacen llamadas HTTP.
- Services son la unica capa que usa Axios.
- TypeScript estricto; evitar `any`, preferir `unknown` cuando el tipo sea incierto.
- Toda vista que consume API maneja loading, empty, error y success.
- Sin `console.log`, `alert()`, `confirm()` ni `prompt()`.
- JWT en `localStorage` con clave `ecn_token`.
- Axios inyecta `Authorization: Bearer <token>`.
- 401 limpia sesion y redirige a `/login`.

## Dominio

- `ATHLETE`: completa onboarding, consulta perfil y gestiona logs.
- `ADMIN`: consulta metricas globales.
- Perfil de atleta: experiencia, estatura, peso, grasa corporal opcional, sentadilla 1RM, press 1RM y peso muerto 1RM.
- Logs: disciplinas `WEIGHTLIFTING`, `RUNNING`, `SWIMMING`, `CYCLING`.

## Verificacion antes de entrega

```bash
npm run typecheck
npm run build
rg -n "\bany\b|console\.|alert\(|confirm\(|prompt\(" src
```

> PRD: [PRD.md](./PRD.md)  
> Arquitectura: [ARCHITECTURE.md](./ARCHITECTURE.md)  
> Perfil de agente: [agents.md](./agents.md)
