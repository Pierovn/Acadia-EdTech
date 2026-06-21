import { Link } from 'react-router-dom'
import { IconChevron } from './Icons'

// Navegación jerárquica. Recibe `items`: [{ label, to? }].
// El último ítem es la página actual (sin enlace).
// Ej: <Breadcrumb items={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Cursos' }]} />
const Breadcrumb = ({ items = [] }) => (
  <nav className="breadcrumb" aria-label="Ruta de navegación">
    <ol className="breadcrumb__list">
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <li key={`${item.label}-${i}`} className="breadcrumb__item">
            {item.to && !last ? (
              <Link to={item.to} className="breadcrumb__link">{item.label}</Link>
            ) : (
              <span className="breadcrumb__current" aria-current={last ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!last && <IconChevron className="breadcrumb__sep" width={14} height={14} />}
          </li>
        )
      })}
    </ol>
  </nav>
)

export default Breadcrumb
