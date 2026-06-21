import Avatar from './Avatar'
import Badge from './Badge'
import LikeButton from './LikeButton'
import { IconMessage } from './Icons'

// Tiempo relativo en español: "hace 2 horas", "hace 3 días"…
const timeAgo = (fecha) => {
  if (!fecha) return ''
  const then = new Date(fecha).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Math.max(0, Date.now() - then)
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'hace un momento'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  if (d < 30) return `hace ${d} día${d > 1 ? 's' : ''}`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `hace ${mo} mes${mo > 1 ? 'es' : ''}`
  return `hace ${Math.floor(mo / 12)} año(s)`
}

const ForumThread = ({ hilo, onResponder, expanded = false }) => {
  const respuestas = hilo.respuestas || []
  const autor = `Alumno ${hilo.id_alumno}`

  return (
    <article className="thread">
      <header className="thread__head">
        <Avatar name={autor} size="md" />
        <div className="thread__author">
          <span className="thread__author-name">{autor}</span>
          <span className="thread__time">{timeAgo(hilo.fecha_creacion)}</span>
        </div>
        <LikeButton count={hilo.likes ?? 0} />
      </header>

      <h3 className="thread__title">{hilo.titulo}</h3>
      <p className="thread__content">{hilo.contenido}</p>

      {(hilo.etiquetas || []).length > 0 && (
        <div className="thread__tags">
          {hilo.etiquetas.map((tag) => (
            <Badge key={tag} variant="primary">#{tag}</Badge>
          ))}
        </div>
      )}

      <footer className="thread__footer">
        <span className="thread__count">
          <IconMessage width={15} height={15} /> {respuestas.length} respuesta{respuestas.length === 1 ? '' : 's'}
        </span>
        {onResponder && (
          <button type="button" className="thread__respond" onClick={() => onResponder(hilo)}>
            Responder
          </button>
        )}
      </footer>

      {expanded && respuestas.length > 0 && (
        <ul className="thread__replies">
          {respuestas.map((r, i) => (
            <li key={i} className="thread__reply">
              <Avatar name={`Alumno ${r.id_alumno}`} size="sm" />
              <div className="thread__reply-body">
                <p className="thread__reply-text">{r.contenido}</p>
                <span className="thread__reply-meta">Alumno {r.id_alumno}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default ForumThread
