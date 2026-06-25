export const QUIZZES = {
  1: {
    titulo: 'Quiz final · JavaScript desde Cero',
    preguntas: [
      {
        pregunta: '¿Qué palabra clave declara una variable de bloque que no puede reasignarse?',
        opciones: ['var', 'let', 'const', 'function'],
        correcta: 2,
      },
      {
        pregunta: '¿Qué método convierte un texto JSON en un objeto JavaScript?',
        opciones: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'parseJSON()'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué operador compara valor y tipo sin conversión implícita?',
        opciones: ['==', '=', '===', '!='],
        correcta: 2,
      },
      {
        pregunta: '¿Qué devuelve typeof [] en JavaScript?',
        opciones: ['"array"', '"object"', '"list"', '"undefined"'],
        correcta: 1,
      },
      {
        pregunta: 'async/await en JavaScript moderno se basa en…',
        opciones: ['Hilos del sistema', 'Promesas', 'Procesos', 'Sockets'],
        correcta: 1,
      },
    ],
  },
  2: {
    titulo: 'Quiz final · React + Node.js Fullstack',
    preguntas: [
      {
        pregunta: '¿Qué hook maneja el estado local de un componente funcional?',
        opciones: ['useEffect', 'useState', 'useRef', 'useMemo'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué hook ejecuta efectos secundarios después del render?',
        opciones: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correcta: 1,
      },
      {
        pregunta: 'En React, los datos se pasan de un componente padre a un hijo mediante…',
        opciones: ['props', 'state', 'refs', 'hooks'],
        correcta: 0,
      },
      {
        pregunta: '¿Qué framework de Node.js se usa para crear APIs REST?',
        opciones: ['Django', 'Express', 'Laravel', 'Flask'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué método HTTP se usa típicamente para crear un recurso?',
        opciones: ['GET', 'POST', 'DELETE', 'HEAD'],
        correcta: 1,
      },
    ],
  },
  3: {
    titulo: 'Quiz final · Diseño UI/UX con Figma',
    preguntas: [
      {
        pregunta: '¿Qué entregable representa la estructura básica de una pantalla sin estilo visual?',
        opciones: ['Mockup', 'Wireframe', 'Render', 'Moodboard'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué principio agrupa visualmente los elementos relacionados?',
        opciones: ['Contraste', 'Proximidad', 'Saturación', 'Kerning'],
        correcta: 1,
      },
      {
        pregunta: 'En Figma, un conjunto reutilizable de estilos y componentes se llama…',
        opciones: ['Plugin', 'Design System', 'Frame', 'Layer'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué evalúa principalmente una prueba de usabilidad?',
        opciones: ['El precio del producto', 'La facilidad de uso por usuarios reales', 'El SEO del sitio', 'El peso del archivo'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué función de Figma permite simular la navegación entre pantallas?',
        opciones: ['Auto-layout', 'Prototipo', 'Componente', 'Grid'],
        correcta: 1,
      },
    ],
  },
  4: {
    titulo: 'Quiz final · Adobe Illustrator para Web',
    preguntas: [
      {
        pregunta: 'Illustrator trabaja principalmente con gráficos…',
        opciones: ['Raster', 'Vectoriales', 'Pixelados', 'Tridimensionales'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué formato conserva la escalabilidad sin perder calidad en la web?',
        opciones: ['JPG', 'PNG', 'SVG', 'GIF'],
        correcta: 2,
      },
      {
        pregunta: '¿Qué herramienta crea trazados mediante puntos de ancla?',
        opciones: ['Pincel', 'Pluma', 'Borrador', 'Lazo'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué modo de color se usa para diseño en pantalla y web?',
        opciones: ['CMYK', 'RGB', 'Pantone', 'Escala de grises'],
        correcta: 1,
      },
      {
        pregunta: 'Un buen logotipo profesional debe ser ante todo…',
        opciones: ['Pesado y detallado', 'Escalable y reconocible', 'Siempre animado', 'En baja resolución'],
        correcta: 1,
      },
    ],
  },
  5: {
    titulo: 'Quiz final · Oracle Database 21c',
    preguntas: [
      {
        pregunta: '¿Qué significa PL/SQL?',
        opciones: ['Programming Logic SQL', 'Procedural Language/SQL', 'Public Library SQL', 'Parallel Load SQL'],
        correcta: 1,
      },
      {
        pregunta: 'En la arquitectura multitenant, ¿qué contenedor agrupa a las PDB?',
        opciones: ['El schema', 'La CDB', 'El tablespace', 'El índice'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué sentencia recupera filas de una tabla?',
        opciones: ['INSERT', 'SELECT', 'UPDATE', 'COMMIT'],
        correcta: 1,
      },
      {
        pregunta: '¿Qué objeto almacena bloques PL/SQL reutilizables con nombre?',
        opciones: ['Vista', 'Índice', 'Procedimiento', 'Secuencia'],
        correcta: 2,
      },
      {
        pregunta: '¿Qué sentencia confirma permanentemente una transacción?',
        opciones: ['ROLLBACK', 'COMMIT', 'SAVEPOINT', 'GRANT'],
        correcta: 1,
      },
    ],
  },
}

export const tieneQuiz = (idCurso) => Boolean(QUIZZES[idCurso])
