import { IconInbox } from './Icons'

// Estado vacío: ilustración (ícono) + mensaje + acción opcional.
// Se usa cuando no hay cursos matriculados, no hay hilos, búsqueda sin resultados, etc.
const EmptyState = ({ icon: Icon = IconInbox, title, message, action }) => (
  <div className="empty-state">
    <span className="empty-state__art">
      <Icon width={28} height={28} />
    </span>
    {title && <p className="empty-state__title">{title}</p>}
    {message && <p className="empty-state__message">{message}</p>}
    {action && <div className="empty-state__action">{action}</div>}
  </div>
)

export default EmptyState
