# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Descripción del Proyecto

EdTech-web es una plataforma educativa full-stack ("Acadia") desarrollada para el curso universitario Bases de Datos II. Utiliza una arquitectura de doble base de datos: Oracle 21c XE para datos relacionales y MongoDB Atlas para datos en documentos.

## Comandos de Desarrollo

### Backend (ejecutar desde `Back/`)
```bash
npm start          # node src/app.js, escucha en el puerto 3000
```

### Frontend (ejecutar desde `Front/`)
```bash
npm run dev        # Servidor de desarrollo Vite en el puerto 5173
npm run build      # Build de producción en dist/
npm run lint       # ESLint
npm run preview    # Vista previa del build de producción
```

No hay suite de pruebas configurada.

## Arquitectura

### Backend (`Back/src/`)

Sigue el patrón MVC con Express 5 (módulos CommonJS). Punto de entrada: `app.js` inicializa ambas conexiones a BD y luego registra las rutas.

**Flujo de una petición:** `routes/` → `controllers/` → `models/` → BD

- `config/oracle.js` — crea un pool de conexiones OracleDB (mín. 2, máx. 10)
- `config/mongodb.js` — conecta Mongoose a MongoDB Atlas
- `middlewares/auth.middleware.js` — guard JWT `verifyToken` usado en rutas protegidas
- `models/oracle/` — consultas OracleDB que devuelven objetos planos
- `models/mongodb/` — esquemas Mongoose
- `controllers/` — lógica de negocio, llama a los modelos y envía respuestas JSON
- `routes/` — monta los controladores y aplica el middleware `verifyToken`

Todos los endpoints de la API están bajo `/api/*`. Endpoints públicos: `/api/auth/register`, `/api/auth/login`, `GET /api/cursos/*`. Todo lo demás requiere un token Bearer JWT.

### Frontend (`Front/src/`)

SPA en React 19 con Vite, Tailwind CSS 4 y React Router v7.

- `context/AuthContext.jsx` — almacena el `token` y datos del usuario decodificados, persistidos en localStorage
- `services/api.js` — instancia Axios (`http://localhost:3000/api`) con interceptor que inyecta `Authorization: Bearer <token>`
- `pages/` — componentes a nivel de ruta
- `components/ui/` — componentes presentacionales reutilizables
- `App.jsx` — define las rutas; las rutas protegidas verifican `isAuthenticated` desde AuthContext

### División de Bases de Datos

| Datos | Base de Datos |
|---|---|
| Usuarios (ALUMNO), cursos, lecciones, matrículas, calificaciones | Oracle 21c XE (`pdb_edtech`) |
| Hilos y respuestas del foro | MongoDB (colección `foro_hilos`) |
| Progreso del alumno por lección | MongoDB (colección `progreso_alumno`) |
| Materiales de curso y cuestionarios | MongoDB (colección `materiales_curso`) |

El DDL del esquema Oracle está en `database/oracle/01_oracle_tablas.sql`. Los validadores de esquema MongoDB están en `database/mongodb/03_mongodb_estructura.js`.

### Variables de Entorno (`Back/.env`)

Requeridas: `ORACLE_USER`, `ORACLE_PASSWORD`, `ORACLE_CONNECTION_STRING`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`.