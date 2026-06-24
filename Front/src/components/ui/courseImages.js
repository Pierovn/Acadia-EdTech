// Imagen identificadora de cada curso (id_curso -> archivo en src/assets/).
//
// Para registrar la imagen de un curso: guarda el archivo en src/assets/ y
// anota aquí su id y nombre. Los cursos sin entrada usan el thumbnail por
// categoría (color + ícono) como respaldo, así que nunca se rompe la vista.
const FILES = {
  1: 'Javadesdecero.png',     // JavaScript
  3: 'DiseñoUX.png',          // Diseño UI/UX
  4: 'Adobeilustrator.png',   // Illustrator
  5: 'OracleDatabase.png',    // Oracle
  7: 'Redes.png',             // Redes
  // Pendientes (agrega el archivo y descomenta/edita el nombre):
  // 2:  'ReactNode.png',       // React + Node
  // 6:  'MongoDB.png',         // MongoDB
  // 8:  'Ciberseguridad.png',  // Ciberseguridad
  // 9:  'PythonData.png',      // Python para Data Science
  // 10: 'MachineLearning.png', // Machine Learning
  // 11: 'Marketing.png',       // Marketing Digital
  // 12: 'Emprendimiento.png',  // Emprendimiento
}

// Vite empaqueta todas las imágenes de assets una sola vez (URLs resueltas).
const modules = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })

const norm = (s) => s.normalize('NFC')
const byName = {}
for (const path in modules) {
  byName[norm(path.split('/').pop())] = modules[path]
}

// Devuelve la URL de la imagen del curso, o null si no hay (usar fallback).
export const courseImage = (idCurso) => {
  const file = FILES[idCurso]
  if (!file) return null
  return byName[norm(file)] || null
}
