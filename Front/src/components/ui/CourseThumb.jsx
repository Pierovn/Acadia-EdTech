import { categoryVisual } from './categories'

// Thumbnail de curso. Si no hay imagen real, usa color sólido por categoría
// + ícono de categoría (grande de fondo y badge nítido al centro).
// size: 'card' (catálogo, vertical) | 'row' (lista, compacto)
const CourseThumb = ({ categoria, titulo, size = 'card' }) => {
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
