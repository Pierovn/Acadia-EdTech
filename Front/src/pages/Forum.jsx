import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import CourseThumb from '../components/ui/CourseThumb'
import ForumThread from '../components/ui/ForumThread'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { IconForum, IconPlus, IconMessage, IconUsers, IconSearch } from '../components/ui/Icons'
import { useAuth } from '../context/AuthContext'
import { getCursoById } from '../services/cursos.service'
import { getHilos, crearHilo, responder } from '../services/foro.service'

const ORDENES = [
  { key: 'recientes', label: 'Recientes' },
  { key: 'populares', label: 'Más activos' },
  { key: 'mios', label: 'Mis hilos' },
]

const Forum = () => {
  const { id } = useParams()
  const idCurso = Number(id)
  const { usuario } = useAuth()
  const reduce = useReducedMotion()
  const tituloRef = useRef(null)

  const [curso, setCurso] = useState(null)
  const [hilos, setHilos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orden, setOrden] = useState('recientes')
  const [query, setQuery] = useState('')
  const [expandido, setExpandido] = useState(null)
  const [respuesta, setRespuesta] = useState('')
  const [nuevo, setNuevo] = useState({ titulo: '', contenido: '', etiquetas: '' })
  const [enviando, setEnviando] = useState(false)

  const cargar = () => {
    setLoading(true)
    Promise.all([getCursoById(idCurso).catch(() => null), getHilos(idCurso)])
      .then(([c, h]) => { setCurso(c); setHilos(h) })
      .catch((err) => setError(err.response?.data?.error || 'No se pudo cargar el foro'))
      .finally(() => setLoading(false))
  }

  useEffect(cargar, [idCurso])

  const toggle = (idHilo) => {
    setExpandido((prev) => (prev === idHilo ? null : idHilo))
    setRespuesta('')
  }

  const stats = useMemo(() => {
    const participantes = new Set()
    let respuestas = 0
    hilos.forEach((h) => {
      participantes.add(h.id_alumno)
      respuestas += h.respuestas?.length || 0
      ;(h.respuestas || []).forEach((r) => participantes.add(r.id_alumno))
    })
    return { hilos: hilos.length, respuestas, participantes: participantes.size }
  }, [hilos])

  const visibles = useMemo(() => {
    const t = query.toLowerCase()
    let list = hilos.filter((h) => {
      if (!t) return true
      return (
        h.titulo?.toLowerCase().includes(t) ||
        h.contenido?.toLowerCase().includes(t) ||
        (h.etiquetas || []).some((tag) => tag.toLowerCase().includes(t))
      )
    })
    if (orden === 'mios' && usuario?.id_alumno != null) {
      list = list.filter((h) => h.id_alumno === usuario.id_alumno)
    } else if (orden === 'populares') {
      list = [...list].sort(
        (a, b) => (b.respuestas?.length || 0) - (a.respuestas?.length || 0) || (b.likes ?? 0) - (a.likes ?? 0)
      )
    } else {
      list = [...list].sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
    }
    return list
  }, [hilos, query, orden, usuario])

  const handleCrear = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      await crearHilo({
        titulo: nuevo.titulo,
        contenido: nuevo.contenido,
        id_curso: idCurso,
        etiquetas: nuevo.etiquetas.split(',').map((s) => s.trim()).filter(Boolean),
      })
      setNuevo({ titulo: '', contenido: '', etiquetas: '' })
      cargar()
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear el hilo')
    } finally {
      setEnviando(false)
    }
  }

  const handleResponder = async (hilo) => {
    if (!respuesta.trim()) return
    try {
      await responder(hilo._id, respuesta)
      setRespuesta('')
      cargar()
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo responder')
    }
  }

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/dashboard' },
          { label: 'Foros', to: '/foro' },
          { label: curso?.TITULO || 'Discusión' },
        ]}
      />

      <motion.section
        className="forum-hero"
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="forum-hero__media">
          <CourseThumb idCurso={idCurso} categoria={curso?.CATEGORIA} titulo={curso?.TITULO} size="row" />
        </div>
        <div className="forum-hero__body">
          <span className="forum-hero__eyebrow">Foro del curso</span>
          <h1 className="forum-hero__title">{curso?.TITULO || 'Discusiones'}</h1>
          <div className="forum-hero__stats">
            <span><IconMessage width={16} height={16} /> {stats.hilos} hilo{stats.hilos === 1 ? '' : 's'}</span>
            <span><IconForum width={16} height={16} /> {stats.respuestas} respuesta{stats.respuestas === 1 ? '' : 's'}</span>
            <span><IconUsers width={16} height={16} /> {stats.participantes} participante{stats.participantes === 1 ? '' : 's'}</span>
          </div>
        </div>
        <button type="button" className="acd-btn forum-hero__cta" onClick={() => tituloRef.current?.focus()}>
          <IconPlus width={16} height={16} /> Nuevo hilo
        </button>
      </motion.section>

      <div className="forum">
        <section className="forum__main">
          <div className="forum__toolbar">
            <div className="search-box forum__search">
              <IconSearch className="search-box__icon" width={18} height={18} />
              <input
                type="search"
                className="search-box__input"
                placeholder="Buscar en el foro…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="filter-pills">
              {ORDENES.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  className={`filter-pill${orden === o.key ? ' filter-pill--active' : ''}`}
                  onClick={() => setOrden(o.key)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {loading && <Spinner center label="Cargando hilos…" />}
          {error && <p className="acd-error">{error}</p>}

          {!loading && !error && visibles.length > 0 && (
            <motion.div className="forum__threads" variants={container} initial="hidden" animate="show">
              {visibles.map((hilo) => (
                <motion.div key={hilo._id} variants={item}>
                  <ForumThread
                    hilo={hilo}
                    currentAlumno={usuario?.id_alumno}
                    expanded={expandido === hilo._id}
                    onToggle={() => toggle(hilo._id)}
                    replyComposer={
                      <div className="thread__composer">
                        <textarea
                          className="forum__textarea"
                          rows={3}
                          placeholder="Escribe una respuesta…"
                          value={respuesta}
                          onChange={(e) => setRespuesta(e.target.value)}
                        />
                        <div className="thread__composer-actions">
                          <button
                            type="button"
                            className="acd-btn acd-btn--primary"
                            onClick={() => handleResponder(hilo)}
                            disabled={!respuesta.trim()}
                          >
                            Responder
                          </button>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && !error && visibles.length === 0 && (
            <EmptyState
              icon={IconForum}
              title={orden === 'mios' ? 'No has abierto hilos' : query ? 'Sin resultados' : 'Aún no hay hilos'}
              message={
                orden === 'mios'
                  ? 'Cuando publiques un hilo en este curso aparecerá aquí.'
                  : query
                    ? 'Prueba con otro término de búsqueda.'
                    : 'Sé el primero en abrir una discusión en este curso.'
              }
            />
          )}
        </section>

        <aside className="forum__new">
          <h3 className="forum__new-title">
            <span className="forum__new-ic"><IconPlus width={16} height={16} /></span>
            Nuevo hilo
          </h3>
          <form className="forum__form" onSubmit={handleCrear}>
            <input
              ref={tituloRef}
              type="text"
              className="forum__input"
              placeholder="Título de tu pregunta"
              value={nuevo.titulo}
              onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
              required
            />
            <textarea
              className="forum__textarea"
              placeholder="Desarrolla tu duda o aporte…"
              value={nuevo.contenido}
              onChange={(e) => setNuevo({ ...nuevo, contenido: e.target.value })}
              required
            />
            <input
              type="text"
              className="forum__input"
              placeholder="Etiquetas (separadas por coma)"
              value={nuevo.etiquetas}
              onChange={(e) => setNuevo({ ...nuevo, etiquetas: e.target.value })}
            />
            <button type="submit" className="acd-btn acd-btn--primary" disabled={enviando}>
              {enviando ? 'Publicando…' : 'Publicar hilo'}
            </button>
          </form>
        </aside>
      </div>
    </Layout>
  )
}

export default Forum
