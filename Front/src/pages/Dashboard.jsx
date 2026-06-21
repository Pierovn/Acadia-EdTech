import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import CourseThumb from '../components/ui/CourseThumb'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { IconCourses, IconCertificate, IconClock, IconChevron } from '../components/ui/Icons'
import { getMisCursos } from '../services/matriculas.service'
import { getProgreso } from '../services/progreso.service'
import { useAuth } from '../context/AuthContext'

const novedades = [
  { titulo: 'Nuevo curso: Next.js 15', tag: 'Programación' },
  { titulo: 'Webinar de PL/SQL avanzado', tag: 'Base de Datos' },
  { titulo: 'Reto semanal de diseño UI', tag: 'Diseño' },
]

const estadoVariant = (estado) => {
  if (estado === 'COMPLETADO') return 'success'
  if (estado === 'ACTIVO') return 'primary'
  return 'danger'
}

const Dashboard = () => {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargar = async () => {
      try {
        const matriculas = await getMisCursos()
        const conProgreso = await Promise.all(
          matriculas.map(async (m) => {
            try {
              const p = await getProgreso(m.ID_CURSO)
              return { ...m, progreso: p.porcentaje_completado ?? 0 }
            } catch {
              return { ...m, progreso: 0 }
            }
          })
        )
        setCursos(conProgreso)
      } catch (err) {
        setError(err.response?.data?.error || 'No se pudieron cargar tus cursos')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  const completados = cursos.filter((c) => c.ESTADO === 'COMPLETADO').length
  const enProgreso = cursos.filter((c) => c.ESTADO === 'ACTIVO').length
  const promedio = cursos.length
    ? Math.round(cursos.reduce((s, c) => s + (c.progreso || 0), 0) / cursos.length)
    : 0

  const stats = [
    { label: 'Cursos inscritos', value: cursos.length, Icon: IconCourses },
    { label: 'Completados', value: completados, Icon: IconCertificate },
    { label: 'En progreso', value: enProgreso, Icon: IconClock },
    { label: 'Avance promedio', value: `${promedio}%`, Icon: IconCourses },
  ]

  const nombre = usuario?.email ? usuario.email.split('@')[0] : ''

  return (
    <Layout>
      <Breadcrumb items={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Dashboard' }]} />

      <div className="dashboard">
        <section className="dashboard__center">
          <header className="page-head">
            <div>
              <h1 className="page-head__title">Hola{nombre ? `, ${nombre}` : ''}</h1>
              <p className="page-head__subtitle">Continúa donde lo dejaste</p>
            </div>
          </header>

          {loading && <Spinner center label="Cargando tus cursos…" />}
          {error && <p className="acd-error">{error}</p>}

          {!loading && !error && (
            <>
              <h2 className="dashboard__section-title">Mis cursos</h2>
              {cursos.length > 0 ? (
                <div className="dashboard__courses">
                  {cursos.map((c) => (
                    <article key={c.ID_MATRICULA} className="mycourse">
                      <CourseThumb categoria={c.CATEGORIA} titulo={c.CURSO} size="row" />
                      <div className="mycourse__main">
                        <div className="mycourse__top">
                          <h4 className="mycourse__title">{c.CURSO}</h4>
                          <Badge variant={estadoVariant(c.ESTADO)}>{c.ESTADO}</Badge>
                        </div>
                        <ProgressBar value={c.progreso} />
                      </div>
                      <button
                        type="button"
                        className="mycourse__go"
                        onClick={() => navigate(`/cursos/${c.ID_CURSO}`)}
                        aria-label="Ver curso"
                      >
                        <IconChevron width={18} height={18} />
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={IconCourses}
                  title="Aún no tienes cursos"
                  message="Explora el catálogo y matricúlate en tu primer curso para empezar a aprender."
                  action={
                    <button type="button" className="acd-btn acd-btn--primary" onClick={() => navigate('/catalog')}>
                      Ver catálogo
                    </button>
                  }
                />
              )}
            </>
          )}
        </section>

        <aside className="dashboard__side">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-card__icon"><s.Icon width={20} height={20} /></span>
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="news-card">
            <h3 className="news-card__title">Novedades</h3>
            <ul className="news-card__list">
              {novedades.map((n) => (
                <li key={n.titulo} className="news-item">
                  <span className="news-item__dot" />
                  <div>
                    <p className="news-item__title">{n.titulo}</p>
                    <span className="news-item__tag">{n.tag}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export default Dashboard
