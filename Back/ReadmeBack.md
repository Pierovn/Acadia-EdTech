# ReadmeBack — Backend Acadia (EdTech)

## Objetivo

Completar el backend de Acadia. El sistema es una API REST (Express 5, MVC, CommonJS) sobre
doble base de datos: **Oracle 21c XE** (`node-oracledb`, datos relacionales) y **MongoDB Atlas**
(`mongoose`, datos documentales). Al terminar, la API debe cubrir el CRUD de **todas** las
entidades que ya existen en la base de datos, protegida con JWT.

## Estado actual

Módulos ya implementados y funcionando (no recrear, reusar su patrón): `auth` (register + login
con bcrypt y JWT), `cursos`, `matriculas`, `calificaciones`, `foro` (Mongo), `progreso` (Mongo).
Montados en `app.js` bajo `/api/...`.

## Lo que debes completar

### 1. Módulo Suscripciones (Oracle)
Existe `models/oracle/suscripcion.model.js`. Crea `controllers/suscripciones.controller.js`,
`routes/suscripciones.routes.js` y móntalo en `app.js` como `/api/suscripciones`.
Tabla `SUSCRIPCION`: `id_suscripcion (PK, SEQ_SUSCRIPCION.NEXTVAL)`, `id_alumno (FK→ALUMNO)`,
`plan ('MENSUAL'|'ANUAL'|'UNICO')`, `monto (>=0)`, `fecha_inicio`, `fecha_fin`,
`estado ('ACTIVO'|'EXPIRADO'|'CANCELADO')`.
Endpoints (protegidos con `verifyToken`): listar, detalle, crear (simula la pasarela de pago),
actualizar estado, cancelar/eliminar.

### 2. Módulo Materiales (MongoDB)
Existe `models/mongodb/material.model.js`. Crea `controllers/materiales.controller.js`,
`routes/materiales.routes.js` y móntalo en `app.js` como `/api/materiales`.
Colección `materiales_curso`: `id_leccion`, `id_curso`, `tipo (video|pdf|quiz)`, `titulo`, `url`,
`duracion_min`, `preguntas[]`.
Endpoints: materiales por curso, materiales por lección, crear, actualizar, eliminar.

### 3. CRUD completo
Cada entidad debe tener Create, Read, Update y Delete. Revisa también los módulos existentes y
agrega lo que falte.

### 4. Endpoints para el frontend pendiente
- `GET /api/cursos/:id` debe incluir sus lecciones.
- `GET /api/materiales/curso/:idCurso`.
- `GET /api/foro/curso/:idCurso` (hilos del foro de un curso): si no existe, agrégalo.

## Reglas (obligatorias)

- Un archivo = una responsabilidad: cada módulo con su `*.model.js`, `*.controller.js`, `*.routes.js`. No mezclar módulos.
- IDs de Oracle siempre con `SEQ_X.NEXTVAL`. Nunca hardcodear IDs.
- Validadores de MongoDB usan `number` (no `int`). No los modifiques.
- JWT: el payload es `{ id_alumno, email }`; usa el middleware `verifyToken`, que lo deja en `req.usuario`.
- Imita el estilo de los controllers existentes (manejo de errores, formato JSON, uso del pool). Antes de escribir, lee `controllers/cursos.controller.js` y `models/oracle/curso.model.js`.

## Restricciones (no hacer)

- No modifiques `config/oracle.js` ni `config/mongodb.js`.
- No modifiques los scripts de la base de datos ni la estructura de la BD.
- No implementes la seguridad de la BD (perfiles, roles, auditoría de Oracle; usuarios/red de Atlas): es otro track.
- No toques el frontend.
- No reescribas los módulos que ya funcionan; solo agrega lo faltante.

## Resultado final esperado

API REST completa con CRUD y JWT sobre: alumnos/auth, categorías, instructores, cursos, lecciones,
matrículas, suscripciones y calificaciones (Oracle); foro, progreso y materiales (MongoDB).
