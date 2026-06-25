const FILES = {
  1: 'Javadesdecero.png',
  2: 'React.png',
  3: 'DiseñoUX.png',
  4: 'Adobeilustrator.png',
  5: 'OracleDatabase.png',
  7: 'Redes.png',
  8: 'Ciberseguridad.png',
  9: 'Python.png',
  10: 'MachineLearning.png',
  11: 'Marketing.png',
  12: 'Emprendimiento.png',
}

const KEYWORDS = [
  ['javascript', 'Javadesdecero.png'],
  ['react', 'React.png'],
  ['node', 'React.png'],
  ['fullstack', 'React.png'],
  ['illustrator', 'Adobeilustrator.png'],
  ['adobe', 'Adobeilustrator.png'],
  ['figma', 'DiseñoUX.png'],
  ['ux', 'DiseñoUX.png'],
  ['oracle', 'OracleDatabase.png'],
  ['sql', 'OracleDatabase.png'],
  ['mongo', 'OracleDatabase.png'],
  ['database', 'OracleDatabase.png'],
  ['base de datos', 'OracleDatabase.png'],
  ['cisco', 'Redes.png'],
  ['ccna', 'Redes.png'],
  ['network', 'Redes.png'],
  ['ciber', 'Ciberseguridad.png'],
  ['hacking', 'Ciberseguridad.png'],
  ['pentest', 'Ciberseguridad.png'],
  ['segur', 'Ciberseguridad.png'],
  ['python', 'Python.png'],
  ['pandas', 'Python.png'],
  ['machine', 'MachineLearning.png'],
  ['scikit', 'MachineLearning.png'],
  ['learning', 'MachineLearning.png'],
  ['marketing', 'Marketing.png'],
  ['seo', 'Marketing.png'],
  ['emprend', 'Emprendimiento.png'],
  ['startup', 'Emprendimiento.png'],
  ['negocio', 'Emprendimiento.png'],
  ['dise', 'DiseñoUX.png'],
  ['data', 'Python.png'],
  ['red', 'Redes.png'],
  ['program', 'Javadesdecero.png'],
]

const DEFAULT_FILE = 'hero-banner.png'

const modules = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })

const normName = (s) => s.normalize('NFC')
const byName = {}
for (const path in modules) {
  byName[normName(path.split('/').pop())] = modules[path]
}

const slug = (s = '') => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const resolve = (file) => (file ? byName[normName(file)] || null : null)

export const courseImage = (idCurso, categoria = '', titulo = '') => {
  const direct = resolve(FILES[idCurso])
  if (direct) return direct
  const hay = slug(`${titulo} ${categoria}`)
  for (const [kw, file] of KEYWORDS) {
    if (hay.includes(kw)) {
      const img = resolve(file)
      if (img) return img
    }
  }
  return resolve(DEFAULT_FILE)
}
