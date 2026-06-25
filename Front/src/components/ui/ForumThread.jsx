import { motion, AnimatePresence } from 'framer-motion'
import Avatar from './Avatar'
import Badge from './Badge'
import LikeButton from './LikeButton'
import { IconMessage, IconChevron } from './Icons'
import { timeAgo } from '../../utils/relativeTime'

const ForumThread = ({ hilo, currentAlumno, expanded = false, onToggle, replyComposer }) => {
  const respuestas = hilo.respuestas || []
  const esMio = currentAlumno != null && hilo.id_alumno === currentAlumno
  const autor = esMio ? 'Tú' : `Alumno ${hilo.id_alumno}`
  const n = respuestas.length

  return (
    <article className={`thread${expanded ? ' thread--open' : ''}`}>
      <header className="thread__head">
        <Avatar name={autor} size="md" />
        <div className="thread__author">
          <span className="thread__author-name">
            {autor}
            {esMio && <span className="thread__you">tú</span>}
          </span>
          <span className="thread__time">{timeAgo(hilo.fecha_creacion)}</span>
        </div>
        <LikeButton count={hilo.likes ?? 0} />
      </header>

      <button type="button" className="thread__title-btn" onClick={onToggle}>
        <h3 className="thread__title">{hilo.titulo}</h3>
      </button>
      <p className="thread__content">{hilo.contenido}</p>

      {(hilo.etiquetas || []).length > 0 && (
        <div className="thread__tags">
          {hilo.etiquetas.map((tag) => (
            <Badge key={tag} variant="primary">#{tag}</Badge>
          ))}
        </div>
      )}

      <footer className="thread__footer">
        <button type="button" className="thread__count" onClick={onToggle}>
          <IconMessage width={15} height={15} /> {n} respuesta{n === 1 ? '' : 's'}
        </button>
        <button type="button" className="thread__respond" onClick={onToggle}>
          {expanded ? 'Ocultar discusión' : 'Responder'}
          <IconChevron
            className={`thread__caret${expanded ? ' thread__caret--open' : ''}`}
            width={15}
            height={15}
          />
        </button>
      </footer>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="thread__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {n > 0 ? (
              <ul className="thread__replies">
                {respuestas.map((r, i) => {
                  const rMio = currentAlumno != null && r.id_alumno === currentAlumno
                  const rAutor = rMio ? 'Tú' : `Alumno ${r.id_alumno}`
                  return (
                    <li key={i} className="thread__reply">
                      <Avatar name={rAutor} size="sm" />
                      <div className="thread__reply-body">
                        <div className="thread__reply-head">
                          <span className="thread__reply-author">{rAutor}</span>
                          <span className="thread__reply-time">{timeAgo(r.fecha)}</span>
                        </div>
                        <p className="thread__reply-text">{r.contenido}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="thread__empty">Sé el primero en responder este hilo.</p>
            )}
            {replyComposer}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default ForumThread
