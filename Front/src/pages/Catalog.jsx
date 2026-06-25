import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/ui/Layout'
import CourseCard from '../components/ui/CourseCard'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { IconSearch } from '../components/ui/Icons'
import { getCursos } from '../services/cursos.service'

const Catalog = () => {
  const [cursos, setCursos] = useState([])
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCursos()
      .then(setCursos)
      .catch((err) => setError(err.response?.data?.error || 'No se pudieron cargar los cursos'))
      .finally(() => setLoading(false))
  }, [])

  const categorias = useMemo(() => {
    const set = new Set(cursos.map((c) => c.CATEGORIA).filter(Boolean))
    return ['Todos', ...set]
  }, [cursos])

  const filtrados = cursos.filter((c) => {
    const t = query.toLowerCase()
    const coincideTexto =
      c.TITULO?.toLowerCase().includes(t) || c.CATEGORIA?.toLowerCase().includes(t) ||
      c.INSTRUCTOR?.toLowerCase().includes(t)
    const coincideCat = categoria === 'Todos' || c.CATEGORIA === categoria
    return coincideTexto && coincideCat
  })

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Catálogo de Cursos</h1>
          <p className="page-head__subtitle">Explora y aprende a tu ritmo</p>
        </div>
        <div className="search-box">
          <IconSearch className="search-box__icon" width={18} height={18} />
          <input
            type="search"
            className="search-box__input"
            placeholder="Buscar curso, categoría o instructor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      {!loading && !error && categorias.length > 1 && (
        <div className="filter-pills catalog__filters">
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

      {loading && <Spinner center label="Cargando cursos…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        filtrados.length > 0 ? (
          <div className="catalog-grid">
            {filtrados.map((curso) => (
              <CourseCard key={curso.ID_CURSO} curso={curso} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={IconSearch}
            title="Sin resultados"
            message="No encontramos cursos que coincidan con tu búsqueda. Prueba con otra categoría o término."
          />
        )
      )}
    </Layout>
  )
}

export default Catalog
