import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Spinner from '../components/ui/Spinner'
import ProgressBar from '../components/ui/ProgressBar'
import { getCursoById, getLecciones } from '../services/cursos.service'
import { matricularse } from '../services/matriculas.service'
import { getMaterialesPorCurso } from '../services/materiales.service'
import { getProgreso, actualizarProgreso } from '../services/progreso.service'
import { useAuth } from '../context/AuthContext'
import { courseImage } from '../components/ui/courseImages'
import { IconClock, IconForum, IconCreditCard, IconCheck, IconPlay, IconDoc, IconQuiz } from '../components/ui/Icons'

const MATERIAL_META = {
  video: { Icon: IconPlay, label: 'Video' },
  pdf: { Icon: IconDoc, label: 'PDF' },
  quiz: { Icon: IconQuiz, label: 'Quiz' },
}

const MaterialChip = ({ material }) => {
  const meta = MATERIAL_META[material.tipo] || MATERIAL_META.pdf
  const { Icon } = meta
  const extra = material.tipo === 'video' && material.duracion_min ? ` · ${material.duracion_min} min` : ''
  const contenido = (
    <>
      <Icon width={14} height={14} />
      {material.titulo}{extra}
    </>
  )
  if (material.url) {
    return (
      <a className="material-chip" href={material.url} target="_blank" rel="noreferrer">
        {contenido}
      </a>
    )
  }
  return <span className="material-chip">{contenido}</span>
}

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [curso, setCurso] = useState(null)
  const [lecciones, setLecciones] = useState([])
  const [materiales, setMateriales] = useState([])
  const [completadas, setCompletadas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    Promise.all([getCursoById(id), getLecciones(id)])
      .then(([c, l]) => { setCurso(c); setLecciones(l) })
      .catch((err) => setError(err.response?.data?.error || 'No se pudo cargar el curso'))
      .finally(() => setLoading(false))
    getMaterialesPorCurso(id).then(setMateriales).catch(() => setMateriales([]))
    if (isAuthenticated) {
      getProgreso(id)
        .then((p) => setCompletadas((p.lecciones_completadas || []).filter((x) => x.completada).map((x) => x.id_leccion)))
        .catch(() => setCompletadas([]))
    }
  }, [id, isAuthenticated])

  const materialesPorLeccion = useMemo(() => {
    const map = {}
    for (const m of materiales) {
      if (!map[m.id_leccion]) map[m.id_leccion] = []
      map[m.id_leccion].push(m)
    }
    return map
  }, [materiales])

  const pct = lecciones.length ? Math.round((completadas.length / lecciones.length) * 100) : 0

  const handleMatricula = async () => {
    if (!isAuthenticated) return navigate('/login')
    setMsg('')
    try {
      await matricularse(Number(id))
      setMsg('¡Te matriculaste correctamente!')
    } catch (err) {
      setMsg(err.response?.data?.error || 'No se pudo completar la matrícula')
    }
  }

  const toggleLeccion = async (idLeccion) => {
    if (!isAuthenticated) return navigate('/login')
    const previo = completadas
    const next = completadas.includes(idLeccion)
      ? completadas.filter((x) => x !== idLeccion)
      : [...completadas, idLeccion]
    const nuevoPct = lecciones.length ? Math.round((next.length / lecciones.length) * 100) : 0
    setCompletadas(next)
    try {
      await actualizarProgreso(Number(id), {
        porcentaje_completado: nuevoPct,
        lecciones_completadas: next.map((x) => ({
          id_leccion: x,
          completada: true,
          fecha_completada: new Date().toISOString(),
        })),
      })
    } catch {
      setCompletadas(previo)
      setMsg('No se pudo actualizar tu progreso')
    }
  }

  if (loading) return <Layout><Spinner center label="Cargando curso…" /></Layout>
  if (error) return <Layout><p className="acd-error">{error}</p></Layout>
  if (!curso) return null

  const heroImg = courseImage(curso.ID_CURSO)

  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'Inicio', to: '/dashboard' },
        { label: 'Cursos', to: '/catalog' },
        { label: curso.TITULO },
      ]} />
      <div className="detail">
        <div className={heroImg ? 'detail__hero detail__hero--media' : 'detail__hero'}>
          <div className="detail__hero-text">
            <span className="detail__badge">{curso.CATEGORIA}</span>
            <h1 className="detail__title">{curso.TITULO}</h1>
            <p className="detail__instructor">Por {curso.INSTRUCTOR}</p>
            <p className="detail__desc">{curso.DESCRIPCION}</p>
            <div className="detail__meta">
              <span className="detail__chip"><IconClock width={15} height={15} /> {curso.DURACION_HORAS} horas</span>
              <span className="detail__chip">{curso.NIVEL}</span>
              <span className="detail__price">S/ {Number(curso.PRECIO).toFixed(2)}</span>
            </div>
            <div className="detail__actions">
              <button type="button" className="acd-btn acd-btn--primary" onClick={handleMatricula}>
                Matricularme
              </button>
              <button
                type="button"
                className="acd-btn acd-btn--ghost"
                onClick={() => navigate('/checkout', { state: { plan: 'UNICO', monto: Number(curso.PRECIO), titulo: curso.TITULO } })}
              >
                <IconCreditCard width={18} height={18} /> Comprar acceso
              </button>
              <Link to={`/foro/${curso.ID_CURSO}`} className="acd-btn acd-btn--ghost">
                <IconForum width={18} height={18} /> Foro del curso
              </Link>
            </div>
            {msg && <p className="detail__msg">{msg}</p>}
          </div>
          {heroImg && (
            <div className="detail__hero-media">
              <img src={heroImg} alt={curso.TITULO} />
            </div>
          )}
        </div>

        {isAuthenticated && lecciones.length > 0 && (
          <div className="detail__progress">
            <div className="detail__progress-head">
              <span className="detail__progress-title">Tu progreso</span>
              <span className="detail__progress-text">{completadas.length} de {lecciones.length} lecciones completadas</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        )}

        <section className="detail__lessons">
          <h2 className="detail__section-title">Lecciones</h2>
          <ol className="lesson-list">
            {lecciones.map((lec) => {
              const mats = materialesPorLeccion[lec.ID_LECCION] || []
              const done = completadas.includes(lec.ID_LECCION)
              return (
                <li key={lec.ID_LECCION} className="lesson-item">
                  <span className="lesson-item__order">{lec.ORDEN}</span>
                  <div className="lesson-item__info">
                    <h4 className="lesson-item__title">{lec.TITULO}</h4>
                    <p className="lesson-item__desc">{lec.DESCRIPCION}</p>
                    {mats.length > 0 && (
                      <div className="lesson-item__materials">
                        {mats.map((m) => <MaterialChip key={m._id} material={m} />)}
                      </div>
                    )}
                  </div>
                  <div className="lesson-item__aside">
                    <span className="lesson-item__dur">{lec.DURACION_MIN} min</span>
                    {isAuthenticated && (
                      <button
                        type="button"
                        className={`lesson-check${done ? ' lesson-check--done' : ''}`}
                        onClick={() => toggleLeccion(lec.ID_LECCION)}
                      >
                        <IconCheck width={15} height={15} /> {done ? 'Completada' : 'Marcar'}
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
            {lecciones.length === 0 && <p className="page-empty">Este curso aún no tiene lecciones.</p>}
          </ol>
        </section>
      </div>
    </Layout>
  )
}

export default CourseDetail
