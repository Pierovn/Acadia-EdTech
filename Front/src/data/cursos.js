const ABREV = {
  'JavaScript desde Cero': 'JavaScript',
  'React + Node.js Fullstack': 'React/Node',
  'Diseño UI/UX con Figma': 'UI/UX',
  'Adobe Illustrator para Web': 'Illustrator',
  'Oracle Database 21c Completo': 'Oracle',
  'MongoDB para Desarrolladores': 'MongoDB',
  'Redes con Cisco CCNA': 'Redes',
  'Ciberseguridad Ofensiva': 'Ciberseguridad',
  'Python para Data Science': 'Python',
  'Machine Learning con Scikit-learn': 'ML',
  'Marketing Digital': 'Marketing',
  'Emprendimiento Tech': 'Emprendimiento',
}

export const abreviar = (t = '') => ABREV[t] || t.split(' ').slice(0, 2).join(' ')
