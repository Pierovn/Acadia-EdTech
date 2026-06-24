# ReadmeBack — Backend Acadia (estado: COMPLETO → fase de pulido)

## Objetivo

El backend **ya está implementado y corriendo**. Esta fase NO es para crear módulos nuevos, sino para **auditar, pulir y garantizar que la API se comunique perfecto con el frontend**, con buenas prácticas y sin errores.

## Estado actual (ya hecho — NO recrear)

- API REST (Express 5, MVC, CommonJS), doble BD: **Oracle 21c XE** (node-oracledb) + **MongoDB Atlas** (mongoose). Corre en `localhost:3000`.
- **Cómo se conecta a Oracle hoy:** con el usuario `edtech_admin` definido en `.env` (`ORACLE_USER`). Existe también el usuario seguro `acadia_app`, pero el backend **aún NO lo usa**; cambiar a ese usuario es opcional y pertenece al track de seguridad, no a esta fase.
- **Módulos completos (Oracle):** auth, alumnos, categorias, instructores, cursos, lecciones, matriculas, suscripciones, calificaciones.
- **Módulos completos (Mongo):** foro, progreso, materiales.
- Todos montados en `app.js` bajo `/api/...`, protegidos con JWT. El middleware `verifyToken` decodifica el token y lo deja en **`req.alumno`** (`{ id_alumno, email }`).

## Lo que debes hacer (pulido)

### 1. Auditoría de endpoints que consume el front
Verifica que existan y devuelvan la **forma** (nombres de campos) que el front espera. Revisa en especial:
- `GET /api/cursos/:id` → debe incluir sus lecciones.
- `GET /api/materiales/curso/:idCurso` y `GET /api/materiales/leccion/:idLeccion`.
- `GET /api/foro/curso/:idCurso` → hilos del foro de un curso.
- `GET /api/calificaciones` → notas del alumno autenticado (usa `req.alumno.id_alumno`).
- `GET /api/progreso/...` y `GET /api/suscripciones` → del alumno autenticado.

Si algún endpoint devuelve campos con nombres distintos a los que el front consume, alinéalos y documenta el cambio. El objetivo es que cada vista del front reciba exactamente lo que necesita (calificaciones, materiales/PDF, progreso/estrellas, foro).

### 2. Buenas prácticas de código
- Manejo de errores uniforme y status codes correctos (400 validación, 401 auth, 404 no encontrado, 500 server).
- Validar los inputs antes de tocar la BD.
- No devolver `err.message` crudo al cliente en producción: mensaje genérico al usuario, detalle solo en el log de consola.
- Asegurar que cada conexión del pool de Oracle se cierre en un `finally`.
- CORS configurado para el origen del front (`http://localhost:5173`).
- Consistencia total: todos los controllers con el mismo patrón (`req.alumno`, `try/catch`, respuesta JSON).

### 3. Links reales de materiales (contenido, no estructura)
Hoy los materiales tienen URLs ficticias (`https://edtech.pe/...`) que no abren. Reemplázalas por **links reales** (YouTube para `video`, un PDF real para `pdf`), usando la tabla "Links de materiales" de abajo. Esto es un cambio de **datos** (campo `url` de la colección `materiales_curso`), NO de estructura: actualiza los documentos por `id_leccion`. Las lecciones sin link en la tabla se quedan igual.

## Links de materiales (Piero pega aquí los links reales)

> Formato: `id_leccion → URL`. Video = enlace de YouTube; PDF = enlace a un PDF real.
> Completa solo las filas que quieras; las vacías no se tocan.

| id_leccion | tipo | título | URL real (pegar) |
|---|---|---|---|
| 1 | video | Variables y tipos en JS | | https://youtu.be/z95mZVUcJ-E 
| 2 | pdf | Guía de funciones y closures | | https://drive.google.com/file/d/1U_wUGWJF_aB0DXJjzFxKA39xTnDtq8Vv/view?usp=drive_link
| 4 | video | Componentes funcionales en React | | https://youtu.be/7iobxzd_2wY 
| 5 | pdf | Hooks: guía completa | | https://drive.google.com/file/d/1ZKtJw7bGrMvOjI9LadAWqc23hE6Vgsnu/view?usp=sharing 
| 7 | video | Principios de diseño visual | | https://youtu.be/DjshEwI6pVk 
| 8 | pdf | Guía de wireframing | | https://youtu.be/8Wqgr7Ry3dk 

(Agrega más filas con el `id_leccion` correspondiente si tienes links para los demás cursos.)

## Reglas (obligatorias)

- Un archivo = una responsabilidad: cada módulo con su `*.model.js`, `*.controller.js`, `*.routes.js`.
- IDs de Oracle siempre con `SEQ_X.NEXTVAL`. Nunca hardcodear.
- No modificar los validadores de MongoDB ni la **estructura** de la BD (sí puedes actualizar datos como los links de materiales).
- JWT: el alumno autenticado está en `req.alumno.id_alumno`.
- No tocar la seguridad de la BD (roles, perfiles, usuarios de Oracle/Atlas): es otro track.
- No tocar el frontend en esta fase.

## Restricciones (no hacer)

- No reescribir los módulos que ya funcionan; solo auditarlos y corregir lo necesario.
- No modificar `config/oracle.js` ni `config/mongodb.js`.

## Resultado esperado

API REST estable y con buenas prácticas, que entrega a cada vista del front exactamente los datos que necesita, y materiales con links reales. Al terminar, un **reporte breve** de qué se auditó y qué se cambió.
