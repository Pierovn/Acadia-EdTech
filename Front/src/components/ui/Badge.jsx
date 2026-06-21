// Etiqueta reutilizable: categorías, estados de curso, tags del foro.
// variant: 'default' | 'primary' | 'success' | 'danger' | 'muted'
const Badge = ({ children, variant = 'default', className = '' }) => (
  <span className={`badge badge--${variant} ${className}`.trim()}>{children}</span>
)

export default Badge
