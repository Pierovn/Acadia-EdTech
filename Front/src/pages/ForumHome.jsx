import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import CourseThumb from '../components/ui/CourseThumb'
import { getCursos } from '../services/cursos.service'
import { IconForum, IconChevron } from '../components/ui/Icons'

const ForumHome = () => {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCursos()
      .then(setCursos)
      .catch((err) => setError(err.response?.data?.error || 'No se pudieron cargar los cursos'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <Breadcrumb items={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Foros' }]} />

      <header className="page-head">
        <div>
          <h1 className="page-head__title">Foros</h1>
          <p className="page-head__subtitle">Elige un curso para ver su foro</p>
        </div>
      </header>

      {loading && <Spinner center label="Cargando foros…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        cursos.length > 0 ? (
          <div className="forum-home">
            {cursos.map((c) => (
              <button key={c.ID_CURSO} type="button" className="forum-home__item" onClick={() => navigate(`/foro/${c.ID_CURSO}`)}>
                <CourseThumb idCurso={c.ID_CURSO} categoria={c.CATEGORIA} titulo={c.TITULO} size="row" />
                <div className="forum-home__info">
                  <h4 className="forum-home__title">{c.TITULO}</h4>
                  <p className="forum-home__meta"><IconForum width={14} height={14} /> {c.CATEGORIA}</p>
                </div>
                <IconChevron width={18} height={18} className="forum-home__chevron" />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState icon={IconForum} title="Sin foros" message="No hay cursos disponibles para mostrar foros." />
        )
      )}
    </Layout>
  )
}

export default ForumHome
