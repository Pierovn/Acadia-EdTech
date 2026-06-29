import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Spinner from '../components/ui/Spinner'
import ProgressBar from '../components/ui/ProgressBar'
import { getCursoById, getLecciones } from '../services/cursos.service'
import { matricularse, getMisCursos, actualizarEstadoMatricula } from '../services/matriculas.service'
import { getMaterialesPorCurso } from '../services/materiales.service'
import { getProgreso, actualizarProgreso } from '../services/progreso.service'
import { getCalificaciones, crearCalificacion } from '../services/calificaciones.service'
import { getSuscripciones } from '../services/suscripciones.service'
import { useAuth } from '../context/AuthContext'
import { courseImage } from '../components/ui/courseImages'
import { QUIZZES } from '../data/quizzes'
import {
  IconClock, IconForum, IconCheck, IconPlay, IconDoc, IconQuiz, IconLock, IconCheckCircle,
} from '../components/ui/Icons'

const NOTA_POR_DEFECTO = 20

const MATERIAL_META = {
  video: { Icon: IconPlay, label: 'Video' },
  pdf: { Icon: IconDoc, label: 'PDF' },
  quiz: { Icon: IconQuiz, label: 'Quiz' },
}

const MaterialChip = ({ material, locked }) => {
  const meta = MATERIAL_META[material.tipo] || MATERIAL_META.pdf
  const { Icon } = meta
  if (locked) {
    return (
      <span className="material-chip material-chip--locked">
        <IconLock width={13} height={13} /> {material.titulo}
      </span>
    )
  }
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
  const [matricula, setMatricula] = useState(null)
  const [subActiva, setSubActiva] = useState(null)
  const [califs, setCalifs] = useState([])
  const [registrando, setRegistrando] = useState(false)
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
      getMisCursos()
        .then((list) => setMatricula(list.find((m) => Number(m.ID_CURSO) === Number(id)) || null))
        .catch(() => setMatricula(null))
      getCalificaciones().then(setCalifs).catch(() => setCalifs([]))
      getSuscripciones()
        .then((subs) => setSubActiva((subs || []).find((s) => s.ESTADO === 'ACTIVO') || null))
        .catch(() => setSubActiva(null))
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

  const estaMatriculado = !!matricula
  const idMatricula = matricula?.ID_MATRICULA
  const quiz = QUIZZES[Number(id)]
  const hayQuiz = !!quiz
  const yaCalificado = !!curso && califs.some((c) => c.CURSO === curso.TITULO)
  const pct = lecciones.length ? Math.round((completadas.length / lecciones.length) * 100) : 0
  const completo = lecciones.length > 0 && completadas.length === lecciones.length

  const completarCurso = async (nota) => {
    if (!estaMatriculado || !idMatricula || registrando || yaCalificado) return
    setRegistrando(true)
    try {
      await crearCalificacion({ id_matricula: idMatricula, nota, comentario: 'Curso completado en Acadia' })
      if (matricula.ESTADO !== 'COMPLETADO') {
        await actualizarEstadoMatricula(idMatricula, 'COMPLETADO').catch(() => {})
      }
      const fresh = await getCalificaciones().catch(() => califs)
      setCalifs(fresh)
      setMatricula((m) => (m ? { ...m, ESTADO: 'COMPLETADO' } : m))
      setMsg(`¡Curso completado! Tu nota (${nota}/20) quedó registrada.`)
    } catch (err) {
      setMsg(err.response?.data?.error || 'No se pudo registrar tu nota')
    } finally {
      setRegistrando(false)
    }
  }

  const handleMatricula = async () => {
    if (!isAuthenticated) return navigate('/login')
    if (!subActiva) {
      // Sin suscripción activa no se puede matricular: lo enviamos a la pasarela.
      navigate('/checkout')
      return
    }
    setMsg('')
    try {
      await matricularse(Number(id))
      const list = await getMisCursos().catch(() => [])
      setMatricula(list.find((m) => Number(m.ID_CURSO) === Number(id)) || null)
      setMsg('¡Te matriculaste correctamente! Ya puedes acceder al contenido.')
    } catch (err) {
      setMsg(err.response?.data?.error || 'No se pudo completar la matrícula')
    }
  }

  const toggleLeccion = async (idLeccion) => {
    if (!estaMatriculado) { setMsg('Matricúlate para registrar tu progreso.'); return }
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
      if (nuevoPct === 100 && !hayQuiz && !yaCalificado) completarCurso(NOTA_POR_DEFECTO)
    } catch {
      setCompletadas(previo)
      setMsg('No se pudo actualizar tu progreso')
    }
  }

  if (loading) return <Layout><Spinner center label="Cargando curso…" /></Layout>
  if (error) return <Layout><p className="acd-error">{error}</p></Layout>
  if (!curso) return null

  const heroImg = courseImage(curso.ID_CURSO, curso.CATEGORIA, curso.TITULO)

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
              {estaMatriculado ? (
                matricula.ESTADO === 'COMPLETADO' ? (
                  <span className="detail__enrolled detail__enrolled--done"><IconCheckCircle width={18} height={18} /> Curso completado</span>
                ) : (
                  <span className="detail__enrolled"><IconCheckCircle width={18} height={18} /> Ya estás matriculado</span>
                )
              ) : (
                <button type="button" className="acd-btn acd-btn--primary" onClick={handleMatricula}>
                  Matricularme
                </button>
              )}
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

        {isAuthenticated && !estaMatriculado && (
          <div className="detail__lock">
            <span className="detail__lock-ic"><IconLock width={20} height={20} /></span>
            <div className="detail__lock-text">
              <p className="detail__lock-title">Contenido bloqueado</p>
              <p className="detail__lock-sub">Matricúlate para acceder a las lecciones, materiales y la evaluación final.</p>
            </div>
            <button type="button" className="acd-btn acd-btn--primary" onClick={handleMatricula}>
              Matricúlate para acceder
            </button>
          </div>
        )}

        {estaMatriculado && lecciones.length > 0 && (
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
                        {mats.map((m) => <MaterialChip key={m._id} material={m} locked={!estaMatriculado} />)}
                      </div>
                    )}
                  </div>
                  <div className="lesson-item__aside">
                    <span className="lesson-item__dur">{lec.DURACION_MIN} min</span>
                    {estaMatriculado && (
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

        {estaMatriculado && hayQuiz && (
          <section className="detail__exam">
            <span className="detail__exam-ic"><IconQuiz width={22} height={22} /></span>
            <div className="detail__exam-text">
              <h3 className="detail__exam-title">Evaluación final</h3>
              <p className="detail__exam-sub">
                {yaCalificado
                  ? 'Ya aprobaste esta evaluación. Tu nota está en tus calificaciones.'
                  : completo
                    ? 'Completaste las lecciones. Rinde el quiz para obtener tu nota y terminar el curso.'
                    : 'Completa todas las lecciones para desbloquear la evaluación final.'}
              </p>
            </div>
            {yaCalificado ? (
              <span className="detail__enrolled"><IconCheckCircle width={18} height={18} /> Aprobado</span>
            ) : (
              <button
                type="button"
                className="acd-btn acd-btn--primary"
                disabled={!completo}
                onClick={() => navigate(`/cursos/${id}/quiz`)}
              >
                Rendir evaluación final
              </button>
            )}
          </section>
        )}
      </div>
    </Layout>
  )
}

export default CourseDetail
