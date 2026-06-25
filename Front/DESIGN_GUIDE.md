# DESIGN_GUIDE — Acadia Frontend (handoff de rediseño)

Guía para continuar el rediseño profundo de Acadia con la MISMA identidad y nivel.
Si retomas en un chat nuevo: lee este archivo + `src/styles/tokens/colors.css` y los
componentes ya hechos (Login, Navbar, Dashboard) antes de tocar nada.

> Regla base: esto es SOLO frontend. No tocar backend ni BD. Consumir endpoints
> existentes vía `src/services/`. Si falta un dato, derivarlo en el front.

---

## 1. Identidad visual (cálida, naranja de marca)

- **Paleta cálida. PROHIBIDO el azul/índigo.** Naranjas del logo intactos.
- Usar SIEMPRE tokens de `src/styles/tokens/colors.css`. Se puede derivar con
  `color-mix(in srgb, ...)`. No inventar colores de marca nuevos.
- Tokens clave:
  - Marca: `--primary #FBDEA3`, `--primary-light #F6C68A`, `--primary-dark #DF9F52`.
  - Texto/oscuro: `--text-primary #2A2018` (espresso cálido — se usa para texto **y** como
    fondo del sidebar oscuro), `--text-secondary`, `--text-muted`.
  - Fondos cálidos: `--bg-page` (crema), `--bg-card` (blanco cálido), `--bg-soft`.
  - Semáforo: `--success`/`--success-soft`, `--danger`/`--danger-soft`.
- **Light mode** en el contenido, pero el **sidebar es oscuro cálido** (degradado de
  `--text-primary`) con acento ámbar activo. Da contraste y "emoción".
- Sombras cálidas (tinte espresso) en `src/styles/tokens/motion.css`.

## 2. Responsive y escala (CLAVE — el usuario ve en 2K)

- El `root` escala por breakpoint en `src/styles/base/reset.css`:
  `16px → 17px (≥1600) → 18.5px (≥2000) → 20px (≥2400)`. Como todo está en `rem`,
  TODA la UI crece en 2K y queda igual en laptop/móvil. **No romper esto.**
- `--content-max: 1700px` (en `spacing.css`).
- Para tamaños que deben escalar con la pantalla usar `clamp(min, vw, max)`
  (ej. ancho del formulario de login, títulos hero).
- Páginas auth: `.auth { height: 100dvh; overflow: hidden }`, formulario centrado con
  `margin: auto`, imagen a `object-fit: cover` llenando su mitad (nada estático/desbordado).
- Siempre probar mentalmente 3 anchos: móvil (<860), laptop (~1440), 2K (2560).

## 3. Animaciones (framer-motion — YA instalado)

- Entrada con stagger:
  ```jsx
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 18 },
                 show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }
  ```
  `initial="hidden" animate="show"`. Respetar `useReducedMotion()` (sin transforms si reduce).
- Hover de cards: `translateY(-3px)` + sombra (vía CSS). Botones: `whileHover/whileTap`.
- Números que cuentan: usar `src/components/ui/CountUp.jsx` (`<CountUp value={n} decimals suffix />`).
- Reveal al scroll (para vistas largas como Catálogo): usar `whileInView` + `viewport={{ once: true }}`.

## 4. Gráficos (recharts — YA instalado)

- Dona: `PieChart` + `Pie innerRadius/outerRadius` + `<Cell fill=hex />` + overlay central + leyenda propia.
- Barras: `BarChart layout="vertical"`.
- Colores como HEX string (recharts no resuelve var()): progreso `#F6C68A`, aprobado
  `#5C8A6A`, desaprobado `#C76B5E`, barra `#DF9F52`, ejes `#7A6A5C`.
- Ejemplos completos: ver `src/pages/Dashboard.jsx`.

## 5. Imágenes de curso

- `src/components/ui/courseImages.js`: mapa `FILES` (id_curso → archivo en `src/assets/`),
  `import.meta.glob` + `courseImage(idCurso)` (devuelve URL o `null`).
- `CourseThumb` usa `courseImage(idCurso)`; si no hay imagen, cae al thumbnail por categoría.
- Registradas: cursos **1, 3, 4, 5, 7, 8, 9**. Faltan **2, 6, 10, 11, 12** (agregar archivo a
  `assets/` y registrar el nombre en `FILES`). Imágenes actuales pesan 6–8 MB → conviene
  comprimir a webp/≈300 KB.

## 6. UX / patrones

- **Breadcrumb solo en rutas de 3+ niveles** (CourseDetail, Forum, Checkout). En vistas
  top-level NO va (ya se quitó de Dashboard, Catálogo, Calificaciones, Perfil, Configuración).
- **Sidebar** (`src/components/ui/Navbar.jsx`): oscuro, logo en chip claro, ítems agrupados
  (Aprendizaje / Cuenta) con tiles de icono, activo en ámbar, chip de usuario + logout, y
  **botón contraer/expandir** persistido en `localStorage('acd-sidebar-collapsed')`.
- Estados SIEMPRE: loading (`Spinner`), vacío (`EmptyState`), error.
- Tarjetas con profundidad (borde `--border-light`, `--radius-lg`, `--shadow-soft`, hover).

## 7. Convenciones de código

- Un archivo = una responsabilidad. CSS por sección en `src/styles/components/`,
  importado en `src/styles/main.css` (auth.css va al final → gana especificidad).
- **Código sin comentarios.**
- JWT en `AuthContext` (no localStorage para JWT; localStorage solo para prefs de UI).
- Llamadas al back solo por `src/services/`. Verificar build con
  `npm run build --prefix Front` tras cada cambio.

---

## 8. Estado actual

HECHO con el nivel objetivo:
- Login + Register (split full-screen, imagen `LadoDerecho.png` a la derecha, ojo de
  contraseña, sin Google, escalado con clamp).
- Sidebar oscuro cálido con contraer/expandir.
- Dashboard (hero degradado, KPIs con acento de color + CountUp, gráfico de barras de
  progreso + dona de distribución, "Continuar aprendiendo").
- Recolor cálido global, escala 2K, sistema de imágenes de curso, limpieza de breadcrumbs.

## 9. Lo que falta (aplicar los MISMOS patrones)

1. **Foro** (`Forum.jsx`, `ForumHome.jsx`, `forum.css`):
   - Índice de foros por curso: lista rica a ancho completo (icono/imagen del curso, nº de
     hilos, último mensaje, tags, hover animado).
   - Foro del curso (`/foro/:id`): hilos tipo discusión (título, autor con `Avatar`, fecha,
     nº respuestas, likes, etiquetas); abrir hilo → respuestas anidadas; crear hilo y
     responder; orden (recientes/populares) y buscador.
   - Servicios: `services/foro.service.js` (getHilos, crearHilo, responder).
2. **Catálogo + Detalle** (`Catalog.jsx`, `CourseDetail.jsx`):
   - Catálogo: grid de cards con hover zoom/elevación, filtro por categoría, badges nivel/precio.
   - Detalle: cabecera atractiva (con imagen del curso), lecciones con sus materiales
     (video/pdf/quiz), barra de progreso, botón de matrícula.
3. **Validaciones de negocio (UX, solo front)**:
   - Si NO está matriculado: deshabilitar/ocultar "marcar completado", quiz y materiales;
     mostrar CTA "Matricúlate para acceder".
   - Si requiere suscripción/pago y no la tiene: enviar a `/checkout` antes de avanzar.
     Opcional: etiqueta "vista previa gratis" en la 1ª lección.
   - Manejar errores del back (ej. 403) con mensaje, sin romper la vista.
   - Datos para derivar acceso: `getMisCursos()` (matriculado), `getSuscripciones()` (suscripción).
4. **Consistencia** en Perfil, Configuración, Calificaciones, Checkout, Navbar: misma
   tipografía, sombras, animaciones y espaciados.

## 10. Comandos

- Dev: `npm run dev --prefix Front`
- Build (verificar): `npm run build --prefix Front`
- Lint: `npm run lint --prefix Front` (hay 2 errores PREEXISTENTES en `AuthContext.jsx` y
  `Forum.jsx`, no introducidos por el rediseño).
