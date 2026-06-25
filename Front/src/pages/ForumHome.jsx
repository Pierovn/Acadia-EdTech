import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import CourseThumb from '../components/ui/CourseThumb'
import Badge from '../components/ui/Badge'
import { getCursos } from '../services/cursos.service'
import { getHilos } from '../services/foro.service'
import { useAuth } from '../context/AuthContext'
import { timeAgo, lastActivity } from '../utils/relativeTime'
import { IconForum, IconMessage, IconChevron, IconSearch, IconClock } from '../components/ui/Icons'

const topTags = (hilos) => {
  const freq = {}
  hilos.forEach((h) => (h.etiquetas || []).forEach((t) => { freq[t] = (freq[t] || 0) + 1 }))
  return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 3)
}

const ForumHome = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const reduce = useReducedMotion()
  const [cursos, setCursos] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  useEffect(() => {
    const cargar = async () => {
      try {
        const lista = await getCursos()
        setCursos(lista)
        if (isAuthenticated) {
          const entradas = await Promise.all(
            lista.map(async (c) => {
              try {
                const hilos = await getHilos(c.ID_CURSO)
                const respuestas = hilos.reduce((s, h) => s + (h.respuestas?.length || 0), 0)
                const ultima = hilos.reduce((m, h) => Math.max(m, lastActivity(h)), 0)
                return [c.ID_CURSO, { hilos: hilos.length, respuestas, ultima, tags: topTags(hilos) }]
              } catch {
                return [c.ID_CURSO, { hilos: 0, respuestas: 0, ultima: 0, tags: [] }]
              }
            })
          )
          setStats(Object.fromEntries(entradas))
        }
      } catch (err) {
        setError(err.response?.data?.error || 'No se pudieron cargar los foros')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [isAuthenticated])

  const categorias = useMemo(() => {
    const set = new Set(cursos.map((c) => c.CATEGORIA).filter(Boolean))
    return ['Todos', ...set]
  }, [cursos])

  const visibles = useMemo(() => {
    const t = query.toLowerCase()
    return cursos
      .filter((c) => {
        const coincideTexto =
          c.TITULO?.toLowerCase().includes(t) || c.CATEGORIA?.toLowerCase().includes(t)
        const coincideCat = categoria === 'Todos' || c.CATEGORIA === categoria
        return coincideTexto && coincideCat
      })
      .sort((a, b) => (stats[b.ID_CURSO]?.ultima || 0) - (stats[a.ID_CURSO]?.ultima || 0))
  }, [cursos, query, categoria, stats])

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Foros de la comunidad</h1>
          <p className="page-head__subtitle">Únete a la conversación de cada curso: pregunta, responde y comparte</p>
        </div>
        <div className="search-box">
          <IconSearch className="search-box__icon" width={18} height={18} />
          <input
            type="search"
            className="search-box__input"
            placeholder="Buscar un foro…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      {!loading && !error && categorias.length > 1 && (
        <div className="filter-pills forum-index__filters">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill${categoria === cat ? ' filter-pill--active' : ''}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && <Spinner center label="Cargando foros…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        visibles.length > 0 ? (
          <motion.div className="forum-index" variants={container} initial="hidden" animate="show">
            {visibles.map((c) => {
              const s = stats[c.ID_CURSO] || { hilos: 0, respuestas: 0, ultima: 0, tags: [] }
              return (
                <motion.button
                  key={c.ID_CURSO}
                  type="button"
                  className="forum-index__item"
                  variants={item}
                  onClick={() => navigate(`/foro/${c.ID_CURSO}`)}
                >
                  <CourseThumb idCurso={c.ID_CURSO} categoria={c.CATEGORIA} titulo={c.TITULO} size="row" />
                  <div className="forum-index__body">
                    <div className="forum-index__top">
                      <h3 className="forum-index__title">{c.TITULO}</h3>
                      {c.CATEGORIA && <Badge variant="default">{c.CATEGORIA}</Badge>}
                    </div>
                    {s.tags.length > 0 && (
                      <div className="forum-index__tags">
                        {s.tags.map((tag) => (
                          <Badge key={tag} variant="primary">#{tag}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="forum-index__meta">
                      <span><IconMessage width={14} height={14} /> {s.respuestas} respuesta{s.respuestas === 1 ? '' : 's'}</span>
                      <span>
                        <IconClock width={14} height={14} />
                        {s.ultima ? `actividad ${timeAgo(s.ultima)}` : 'sin actividad aún'}
                      </span>
                    </div>
                  </div>
                  <div className="forum-index__aside">
                    <span className="forum-index__count">{s.hilos}</span>
                    <span className="forum-index__count-label">hilo{s.hilos === 1 ? '' : 's'}</span>
                    <IconChevron className="forum-index__chevron" width={20} height={20} />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        ) : (
          <EmptyState
            icon={IconForum}
            title="Sin foros"
            message="No encontramos foros que coincidan con tu búsqueda. Prueba con otra categoría o término."
          />
        )
      )}
    </Layout>
  )
}

export default ForumHome
