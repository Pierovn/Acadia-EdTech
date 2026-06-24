import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { IconCertificate } from '../components/ui/Icons'
import { getCalificaciones } from '../services/calificaciones.service'

const rendVariant = (r) => {
  if (r === 'EXCELENTE') return 'success'
  if (r === 'APROBADO') return 'primary'
  return 'danger'
}

const formatFecha = (f) => {
  if (!f) return ''
  const d = new Date(f)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })
}

const Calificaciones = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCalificaciones()
      .then(setItems)
      .catch((err) => setError(err.response?.data?.error || 'No se pudieron cargar tus calificaciones'))
      .finally(() => setLoading(false))
  }, [])

  const promedio = useMemo(() => {
    if (!items.length) return null
    const suma = items.reduce((s, c) => s + Number(c.NOTA || 0), 0)
    return (suma / items.length).toFixed(1)
  }, [items])

  const aprobados = items.filter((c) => Number(c.NOTA) >= 11).length

  return (
    <Layout>
      <Breadcrumb items={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Calificaciones' }]} />

      <header className="page-head">
        <div>
          <h1 className="page-head__title">Mis calificaciones</h1>
          <p className="page-head__subtitle">Tu rendimiento por curso</p>
        </div>
      </header>

      {loading && <Spinner center label="Cargando calificaciones…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        items.length > 0 ? (
          <>
            <div className="grades-summary">
              <div className="grades-stat">
                <span className="grades-stat__value">{promedio}</span>
                <span className="grades-stat__label">Promedio general</span>
              </div>
              <div className="grades-stat">
                <span className="grades-stat__value">{items.length}</span>
                <span className="grades-stat__label">Cursos calificados</span>
              </div>
              <div className="grades-stat">
                <span className="grades-stat__value">{aprobados}</span>
                <span className="grades-stat__label">Aprobados</span>
              </div>
            </div>

            <div className="grades-list">
              {items.map((c) => (
                <article key={c.ID_CALIFICACION} className="grade-card">
                  <span className="grade-card__nota">{Number(c.NOTA)}</span>
                  <div className="grade-card__body">
                    <div className="grade-card__top">
                      <h3 className="grade-card__curso">{c.CURSO}</h3>
                      <Badge variant={rendVariant(c.RENDIMIENTO)}>{c.RENDIMIENTO}</Badge>
                    </div>
                    {c.COMENTARIO && <p className="grade-card__comment">{c.COMENTARIO}</p>}
                    <span className="grade-card__date">{formatFecha(c.FECHA)}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={IconCertificate}
            title="Aún no tienes calificaciones"
            message="Cuando completes y seas evaluado en tus cursos, tus notas aparecerán aquí."
            action={
              <button type="button" className="acd-btn acd-btn--primary" onClick={() => navigate('/catalog')}>
                Ver catálogo
              </button>
            }
          />
        )
      )}
    </Layout>
  )
}

export default Calificaciones
