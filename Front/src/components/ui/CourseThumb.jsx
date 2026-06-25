import { categoryVisual } from './categories'
import { courseImage } from './courseImages'

// Thumbnail de curso. Si el curso tiene imagen propia (por id) la usa;
// si no, cae a un color sólido por categoría + ícono de categoría.
// size: 'card' (catálogo, vertical) | 'row' (lista, compacto)
const CourseThumb = ({ idCurso, categoria, titulo, size = 'card' }) => {
  const img = courseImage(idCurso, categoria, titulo)

  if (img) {
    return (
      <div className={`course-thumb course-thumb--${size} course-thumb--photo`}>
        <img src={img} alt={titulo || 'Curso'} className="course-thumb__img" loading="lazy" />
      </div>
    )
  }

  const { Icon, color } = categoryVisual(categoria, titulo)
  const iconSize = size === 'row' ? 22 : 34

  return (
    <div className={`course-thumb course-thumb--${size}`} style={{ backgroundColor: color }}>
      <Icon className="course-thumb__ghost" width={size === 'row' ? 48 : 96} height={size === 'row' ? 48 : 96} />
      <span className="course-thumb__badge">
        <Icon width={iconSize} height={iconSize} />
      </span>
    </div>
  )
}

export default CourseThumb
