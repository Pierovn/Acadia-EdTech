import {
  IconCode, IconDesign, IconDatabase, IconAI, IconShield, IconNetwork, IconCourses,
} from './Icons'

// Colores de curso oficiales (rotación de fallback cuando no hay imagen).
const COURSE_COLORS = ['var(--course-yellow)', 'var(--course-orange)', 'var(--course-pink)']

// Mapeo categoría → ícono + color, por palabra clave (las categorías vienen
// como texto libre desde el backend, así que normalizamos y buscamos.)
const RULES = [
  { match: ['program', 'desarrollo', 'web', 'javascript', 'python'], Icon: IconCode, color: 'var(--course-yellow)' },
  { match: ['dise', 'ux', 'ui', 'figma'], Icon: IconDesign, color: 'var(--course-pink)' },
  { match: ['base de datos', 'database', 'sql', 'oracle', 'mongo'], Icon: IconDatabase, color: 'var(--course-orange)' },
  { match: ['ia', 'inteligencia', 'data', 'machine', 'ciencia de datos'], Icon: IconAI, color: 'var(--primary-light)' },
  { match: ['segur', 'ciber', 'hacking'], Icon: IconShield, color: 'var(--course-pink)' },
  { match: ['red', 'network', 'cloud', 'devops'], Icon: IconNetwork, color: 'var(--course-orange)' },
]

const norm = (s = '') =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Devuelve { Icon, color } para una categoría dada.
export const categoryVisual = (categoria = '', fallbackKey = '') => {
  const c = norm(categoria)
  for (const rule of RULES) {
    if (rule.match.some((m) => c.includes(norm(m)))) {
      return { Icon: rule.Icon, color: rule.color }
    }
  }
  // Fallback determinista por la clave dada (categoría o título).
  let h = 0
  const key = fallbackKey || categoria
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % COURSE_COLORS.length
  return { Icon: IconCourses, color: COURSE_COLORS[h] }
}
