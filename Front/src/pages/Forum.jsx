import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import ForumThread from '../components/ui/ForumThread'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { IconForum, IconPlus } from '../components/ui/Icons'
import { useAuth } from '../context/AuthContext'
import { getHilos, crearHilo, responder } from '../services/foro.service'

const FILTROS = [
  { key: 'recientes', label: 'Recientes' },
  { key: 'votados', label: 'Más votados' },
  { key: 'mios', label: 'Mis hilos' },
  { key: 'todos', label: 'Todos' },
]

const Forum = () => {
  const { id } = useParams()
  const idCurso = Number(id)
  const { usuario } = useAuth()
  const [hilos, setHilos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('recientes')
  const [nuevo, setNuevo] = useState({ titulo: '', contenido: '', etiquetas: '' })
  const [enviando, setEnviando] = useState(false)
  const [respondiendo, setRespondiendo] = useState(null)
  const [respuesta, setRespuesta] = useState('')

  const cargar = () => {
    setLoading(true)
    getHilos(idCurso)
      .then(setHilos)
      .catch((err) => setError(err.response?.data?.error || 'No se pudo cargar el foro'))
      .finally(() => setLoading(false))
  }

  useEffect(cargar, [idCurso])

  const visibles = useMemo(() => {
    let list = [...hilos]
    if (filtro === 'mios' && usuario?.id_alumno != null) {
      list = list.filter((h) => h.id_alumno === usuario.id_alumno)
    } else if (filtro === 'votados') {
      list.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
    } else if (filtro === 'recientes') {
      list.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
    }
    return list
  }, [hilos, filtro, usuario])

  const handleCrear = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      await crearHilo({
        titulo: nuevo.titulo,
        contenido: nuevo.contenido,
        id_curso: idCurso,
        etiquetas: nuevo.etiquetas.split(',').map((t) => t.trim()).filter(Boolean),
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
    if (respondiendo === hilo._id) {
      if (!respuesta.trim()) return
      try {
        await responder(hilo._id, respuesta)
        setRespuesta('')
        setRespondiendo(null)
        cargar()
      } catch (err) {
        setError(err.response?.data?.error || 'No se pudo responder')
      }
    } else {
      setRespondiendo(hilo._id)
      setRespuesta('')
    }
  }

  return (
    <Layout>
      <Breadcrumb items={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Foros', to: '/foro' }, { label: 'Discusión' }]} />

      <header className="page-head">
        <div>
          <h1 className="page-head__title">Foro del curso</h1>
          <p className="page-head__subtitle">Pregunta, responde y comparte</p>
        </div>
      </header>

      <div className="forum">
        <section className="forum__threads">
          <div className="filter-pills forum__filters">
            {FILTROS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filter-pill${filtro === f.key ? ' filter-pill--active' : ''}`}
                onClick={() => setFiltro(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading && <Spinner center label="Cargando hilos…" />}
          {error && <p className="acd-error">{error}</p>}

          {!loading && !error && visibles.map((hilo) => (
            <div key={hilo._id}>
              <ForumThread
                hilo={hilo}
                onResponder={handleResponder}
                expanded={respondiendo === hilo._id}
              />
              {respondiendo === hilo._id && (
                <div className="forum__reply-box">
                  <textarea
                    className="forum__textarea"
                    placeholder="Escribe tu respuesta…"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                  />
                  <button type="button" className="acd-btn acd-btn--primary" onClick={() => handleResponder(hilo)}>
                    Enviar respuesta
                  </button>
                </div>
              )}
            </div>
          ))}

          {!loading && !error && visibles.length === 0 && (
            <EmptyState
              icon={IconForum}
              title={filtro === 'mios' ? 'No has abierto hilos' : 'Aún no hay hilos'}
              message={filtro === 'mios'
                ? 'Cuando publiques un hilo en este curso aparecerá aquí.'
                : 'Sé el primero en abrir una discusión en este curso.'}
            />
          )}
        </section>

        <aside className="forum__new">
          <h3 className="forum__new-title"><IconPlus width={18} height={18} /> Nuevo hilo</h3>
          <form className="forum__form" onSubmit={handleCrear}>
            <input
              type="text"
              className="forum__input"
              placeholder="Título"
              value={nuevo.titulo}
              onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
              required
            />
            <textarea
              className="forum__textarea"
              placeholder="¿Cuál es tu duda?"
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
