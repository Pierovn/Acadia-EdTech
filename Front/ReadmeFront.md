# ReadmeFront — Frontend Acadia (estado: FUNCIONAL → fase de pulido visual)

## Objetivo

El frontend **ya funciona y consume el backend** (la auditoría del back confirmó que los endpoints están alineados). Esta fase es de **mejora de diseño / UI**, NO de funcionalidad: todo lo que ya funciona debe seguir funcionando; el objetivo es que la app **se vea profesional y pulida**.

## Estado actual (ya hecho — no rehacer la lógica)

- React + Vite + Tailwind v4, **light mode**. Páginas: Login, Register, Dashboard, Catalog, CourseDetail, Calificaciones, Checkout, Forum, ForumHome, Perfil, Configuracion.
- Services conectados al backend (`services/` + `services/api.js` con interceptor JWT). JWT en `AuthContext` (NO localStorage).

## Recursos disponibles (úsalos libremente)

- **Skills de front** en `../.agents/skills/`: `frontend-design` y `vercel-react-best-practices`. Úsalas para mejorar el render y aplicar buenas prácticas de React.
- **Paleta de marca** en `src/styles/tokens/colors.css` (cremas/amarillos). **MANTENER siempre estos colores.**
- **Assets** en `src/assets/`: `LadoIzquierdo.png` (ilustración para el login) y `logo-acadia.png` (logo).

## Lo que debes hacer (pulido visual)

### 1. Rediseñar el Login y el Register (`pages/Login.jsx`, `pages/Register.jsx` + `styles/components/auth.css`)
- **Login:** layout split 50/50. El lado de la imagen (el 50% naranja) debe mostrar **solo** `LadoIzquierdo.png`, **sin texto encima**. El otro 50% es el formulario, con el **logo** (`logo-acadia.png`) en un lugar **destacado y llamativo**.
- El fondo blanco con manchas naranjas se ve raro: cámbialo por un fondo **limpio** donde el formulario **resalte** (degradado suave o color sólido de marca). El container con bordes redondeados y **sombra** que lo haga "flotar".
- Agrega una **animación suave** de entrada (fade/slide). Si conviene, instala `framer-motion`.
- **Register (crear cuenta):** rediséñalo **vinculado y consistente con el Login** — mismo estilo de split, imagen, logo, sombra y animación. Login y Register deben verse como una pareja, no como dos pantallas distintas.

### 2. Sidebar (`components/ui/Navbar.jsx` + `styles/components/navbar.css`)
- **Quita la card de "+32 mil estudiantes"** (se ve fea).
- Mejora el sidebar según la **imagen de referencia** que se pega en el prompt, manteniendo los colores de marca.

### 3. Dashboard (`pages/Dashboard.jsx` + `styles/components/dashboard.css`)
- Mejora el diseño según la **imagen de referencia** del prompt, manteniendo colores de marca, jerarquía clara y tarjetas limpias.

### 4. Rediseño general (consistencia)
Rediseña **casi todas las vistas** para que sean consistentes entre sí: Login, Register, Dashboard, Sidebar, Catalog, CourseDetail, Forum/ForumHome, Calificaciones, Perfil, Checkout y Configuracion. Misma identidad visual en todas.

## Uso de las imágenes de referencia

Las imágenes que se peguen en el prompt son **inspiración**, no plantillas a copiar tal cual. Toma de ellas el **seccionado, los mockups, la separación por secciones/módulos** y la distribución/jerarquía, pero **NO cambies la paleta de colores actual** (`styles/tokens/colors.css`): adapta esa inspiración a los colores de marca de Acadia.

## Reglas (obligatorias)

- **MANTENER la paleta** de `styles/tokens/colors.css`. Light mode, NO dark mode.
- Un archivo = una responsabilidad; CSS por sección en `styles/components/`.
- JWT en `AuthContext`, no localStorage. Tailwind v4 (`@import "tailwindcss"`).
- No romper la funcionalidad existente: esta fase es **solo visual**.
- No tocar el backend ni la base de datos.
- Puedes instalar una librería de animación (ej. `framer-motion`) si mejora el resultado.

## Resultado esperado

Login moderno (split con la imagen a un lado, formulario que resalta, logo llamativo, container con sombra y animación suave), sidebar sin la card fea, y dashboard mejorado según la referencia — todo con los colores de marca.
