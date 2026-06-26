import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Spinner from '../components/ui/Spinner'
import Quiz from '../components/ui/Quiz'
import { getCursoById, getLecciones } from '../services/cursos.service'
import { getMisCursos, actualizarEstadoMatricula } from '../services/matriculas.service'
import { getProgreso } from '../services/progreso.service'
import { getCalificaciones, crearCalificacion } from '../services/calificaciones.service'
import { useAuth } from '../context/AuthContext'
import { QUIZZES } from '../data/quizzes'
import { IconLock, IconCheckCircle } from '../components/ui/Icons'

const QuizPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const quiz = QUIZZES[Number(id)]

  const [curso, setCurso] = useState(null)
  const [lecciones, setLecciones] = useState([])
  const [completadas, setCompletadas] = useState([])
  const [matricula, setMatricula] = useState(null)
  const [califs, setCalifs] = useState([])
  const [loading, setLoading] = useState(true)
  const [registrando, setRegistrando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    Promise.all([
      getCursoById(id),
      getLecciones(id),
      getMisCursos().catch(() => []),
      getProgreso(id).catch(() => ({})),
      getCalificaciones().catch(() => []),
    ])
      .then(([c, l, mis, prog, cal]) => {
        setCurso(c)
        setLecciones(l)
        setMatricula(mis.find((m) => Number(m.ID_CURSO) === Number(id)) || null)
        setCompletadas((prog?.lecciones_completadas || []).filter((x) => x.completada).map((x) => x.id_leccion))
        setCalifs(cal)
      })
      .catch(() => setError('No se pudo cargar la evaluación.'))
      .finally(() => setLoading(false))
  }, [id, isAuthenticated, navigate])

  const yaCalificado = useMemo(
    () => !!curso && califs.some((c) => c.CURSO === curso.TITULO),
    [curso, califs]
  )
  const completo = lecciones.length > 0 && completadas.length === lecciones.length
  const idMatricula = matricula?.ID_MATRICULA

  const aprobar = async (nota) => {
    if (!idMatricula || registrando || yaCalificado) return
    setRegistrando(true)
    try {
      await crearCalificacion({ id_matricula: idMatricula, nota, comentario: 'Evaluación final aprobada en Acadia' })
      if (matricula.ESTADO !== 'COMPLETADO') await actualizarEstadoMatricula(idMatricula, 'COMPLETADO')
      setMatricula((m) => (m ? { ...m, ESTADO: 'COMPLETADO' } : m))
      const fresh = await getCalificaciones().catch(() => califs)
      setCalifs(fresh)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo registrar tu nota.')
    } finally {
      setRegistrando(false)
    }
  }

  if (loading) return <Layout><Spinner center label="Cargando evaluación…" /></Layout>
  if (error) return <Layout><p className="acd-error">{error}</p></Layout>
  if (!curso) return null

  const bloqueo = (titulo, sub) => (
    <div className="quiz-gate">
      <span className="quiz-gate__ic"><IconLock width={26} height={26} /></span>
      <h2 className="quiz-gate__title">{titulo}</h2>
      <p className="quiz-gate__sub">{sub}</p>
      <Link to={`/cursos/${id}`} className="acd-btn acd-btn--primary">Volver al curso</Link>
    </div>
  )

  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'Inicio', to: '/dashboard' },
        { label: 'Cursos', to: '/catalog' },
        { label: curso.TITULO, to: `/cursos/${id}` },
        { label: 'Evaluación' },
      ]} />

      {!quiz
        ? bloqueo('Este curso no tiene evaluación', 'Completa las lecciones para terminar el curso.')
        : !matricula
          ? bloqueo('Necesitas matricularte', 'Matricúlate en el curso para rendir la evaluación final.')
          : (!completo && !yaCalificado)
            ? bloqueo('Completa las lecciones primero', 'Termina todas las lecciones del curso para desbloquear la evaluación.')
            : (
              <motion.div
                className="quiz-page"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <header className="quiz-page__head">
                  <span className="quiz-page__eyebrow">Evaluación final</span>
                  <h1 className="quiz-page__title">{curso.TITULO}</h1>
                  <p className="quiz-page__sub">Responde las preguntas para obtener tu nota. Necesitas 11/20 para aprobar y completar el curso.</p>
                </header>

                <Quiz quiz={quiz} yaAprobado={yaCalificado} onAprobado={aprobar} />

                <div className="quiz-page__foot">
                  <Link to={`/cursos/${id}`} className="acd-btn acd-btn--ghost">Volver al curso</Link>
                  {yaCalificado && (
                    <Link to="/calificaciones" className="acd-btn acd-btn--primary">
                      <IconCheckCircle width={16} height={16} /> Ver mis calificaciones
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
    </Layout>
  )
}

export default QuizPage
