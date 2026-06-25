import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import Badge from './Badge'
import CourseThumb from './CourseThumb'
import { IconStar, IconClock, IconChevron } from './Icons'

const CourseCard = ({ curso, variant = 'grid', progreso, rating }) => {
  const navigate = useNavigate()
  const titulo = curso.TITULO
  const categoria = curso.CATEGORIA
  const instructor = curso.INSTRUCTOR

  const goDetail = () => navigate(`/cursos/${curso.ID_CURSO}`)

  if (variant === 'row') {
    return (
      <article className="course-row" onClick={goDetail}>
        <CourseThumb idCurso={curso.ID_CURSO} categoria={categoria} titulo={titulo} size="row" />
        <div className="course-row__info">
          <h4 className="course-row__title">{titulo}</h4>
          <p className="course-row__meta">{instructor} · {curso.NIVEL}</p>
        </div>
        {typeof rating === 'number' && (
          <span className="course-row__rating"><IconStar width={14} height={14} /> {rating.toFixed(1)}</span>
        )}
        <button type="button" className="acd-btn acd-btn--primary course-row__btn" onClick={(e) => { e.stopPropagation(); goDetail() }}>
          Ver curso
        </button>
      </article>
    )
  }

  return (
    <article className="course-card" onClick={goDetail}>
      <div className="course-card__thumb">
        <CourseThumb idCurso={curso.ID_CURSO} categoria={categoria} titulo={titulo} size="card" />
        <span className="course-card__shade" />
        {categoria && <Badge variant="primary" className="course-card__badge">{categoria}</Badge>}
        {curso.NIVEL && <span className="course-card__level">{curso.NIVEL}</span>}
      </div>
      <div className="course-card__body">
        <h3 className="course-card__title">{titulo}</h3>
        <p className="course-card__instructor">{instructor}</p>

        {typeof progreso === 'number' ? (
          <ProgressBar value={progreso} />
        ) : (
          <div className="course-card__meta">
            {curso.DURACION_HORAS != null && (
              <Badge variant="muted"><IconClock width={13} height={13} /> {curso.DURACION_HORAS}h</Badge>
            )}
            {typeof rating === 'number' && (
              <Badge variant="muted"><IconStar width={13} height={13} /> {rating.toFixed(1)}</Badge>
            )}
          </div>
        )}

        <div className="course-card__footer">
          <span className="course-card__price">S/ {Number(curso.PRECIO).toFixed(2)}</span>
          <span className="course-card__cta">Ver curso <IconChevron width={15} height={15} /></span>
        </div>
      </div>
    </article>
  )
}

export default CourseCard
