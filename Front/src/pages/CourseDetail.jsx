import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Spinner from '../components/ui/Spinner'
import { getCursoById, getLecciones } from '../services/cursos.service'
import { matricularse } from '../services/matriculas.service'
import { useAuth } from '../context/AuthContext'
import { IconClock, IconForum } from '../components/ui/Icons'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [curso, setCurso] = useState(null)
  const [lecciones, setLecciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    Promise.all([getCursoById(id), getLecciones(id)])
      .then(([c, l]) => { setCurso(c); setLecciones(l) })
      .catch((err) => setError(err.response?.data?.error || 'No se pudo cargar el curso'))
      .finally(() => setLoading(false))
  }, [id])

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

  if (loading) return <Layout><Spinner center label="Cargando curso…" /></Layout>
  if (error) return <Layout><p className="acd-error">{error}</p></Layout>
  if (!curso) return null

  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'Inicio', to: '/dashboard' },
        { label: 'Cursos', to: '/catalog' },
        { label: curso.TITULO },
      ]} />
      <div className="detail">
        <div className="detail__hero">
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
            <Link to={`/foro/${curso.ID_CURSO}`} className="acd-btn acd-btn--ghost">
              <IconForum width={18} height={18} /> Foro del curso
            </Link>
          </div>
          {msg && <p className="detail__msg">{msg}</p>}
        </div>

        <section className="detail__lessons">
          <h2 className="detail__section-title">Lecciones</h2>
          <ol className="lesson-list">
            {lecciones.map((lec) => (
              <li key={lec.ID_LECCION} className="lesson-item">
                <span className="lesson-item__order">{lec.ORDEN}</span>
                <div className="lesson-item__info">
                  <h4 className="lesson-item__title">{lec.TITULO}</h4>
                  <p className="lesson-item__desc">{lec.DESCRIPCION}</p>
                </div>
                <span className="lesson-item__dur">{lec.DURACION_MIN} min</span>
              </li>
            ))}
            {lecciones.length === 0 && <p className="page-empty">Este curso aún no tiene lecciones.</p>}
          </ol>
        </section>
      </div>
    </Layout>
  )
}

export default CourseDetail
