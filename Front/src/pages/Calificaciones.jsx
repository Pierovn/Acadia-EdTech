import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Layout from '../components/ui/Layout'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import CountUp from '../components/ui/CountUp'
import { IconCertificate } from '../components/ui/Icons'
import { getCalificaciones } from '../services/calificaciones.service'

const REND = {
  EXCELENTE: { variant: 'success', color: '#5C8A6A' },
  APROBADO: { variant: 'primary', color: '#DF9F52' },
  'EN RIESGO': { variant: 'warning', color: '#E0A44E' },
  DESAPROBADO: { variant: 'danger', color: '#C76B5E' },
}

const AXIS = '#7A6A5C'
const corto = (t = '') => (t.length > 20 ? `${t.slice(0, 19)}…` : t)

const formatFecha = (f) => {
  if (!f) return ''
  const d = new Date(f)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })
}

const Calificaciones = () => {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
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
    return items.reduce((s, c) => s + Number(c.NOTA || 0), 0) / items.length
  }, [items])

  const aprobados = items.filter((c) => Number(c.NOTA) >= 11).length
  const mejor = items.length ? Math.max(...items.map((c) => Number(c.NOTA || 0))) : null

  const barData = useMemo(
    () => [...items]
      .sort((a, b) => Number(b.NOTA) - Number(a.NOTA))
      .map((c) => ({ name: corto(c.CURSO), nota: Number(c.NOTA), color: (REND[c.RENDIMIENTO] || REND.APROBADO).color })),
    [items]
  )

  const stats = [
    { label: 'Promedio general', value: promedio, nota: true, tone: 'amber' },
    { label: 'Cursos calificados', value: items.length, tone: 'orange' },
    { label: 'Aprobados', value: aprobados, tone: 'green' },
    { label: 'Mejor nota', value: mejor, nota: true, tone: 'gold' },
  ]

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Mis calificaciones</h1>
          <p className="page-head__subtitle">Tu rendimiento académico por curso</p>
        </div>
      </header>

      {loading && <Spinner center label="Cargando calificaciones…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        items.length > 0 ? (
          <>
            <div className="grades-summary">
              {stats.map((s) => (
                <div key={s.label} className={`grades-stat grades-stat--${s.tone}`}>
                  <span className="grades-stat__value">
                    {s.value === null
                      ? '—'
                      : s.nota
                        ? <CountUp value={s.value} decimals={1} />
                        : <CountUp value={s.value} />}
                  </span>
                  <span className="grades-stat__label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="chart-card grades-chart">
              <h3 className="chart-card__title">Tu desempeño por curso</h3>
              <ResponsiveContainer width="100%" height={Math.max(180, barData.length * 48)}>
                <BarChart data={barData} layout="vertical" margin={{ left: 4, right: 28, top: 4, bottom: 4 }}>
                  <XAxis type="number" domain={[0, 20]} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fontSize: 12, fill: AXIS }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip formatter={(v) => [`${v}/20`, 'Nota']} cursor={{ fill: 'rgba(42,32,24,0.04)' }} />
                  <Bar dataKey="nota" radius={[0, 8, 8, 0]} barSize={18}>
                    {barData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <motion.div className="grades-list" variants={container} initial="hidden" animate="show">
              {items.map((c) => {
                const rend = REND[c.RENDIMIENTO] || REND.APROBADO
                return (
                  <motion.article key={c.ID_CALIFICACION} className="grade-card" variants={item}>
                    <span className="grade-card__nota" style={{ color: rend.color, backgroundColor: `color-mix(in srgb, ${rend.color} 16%, transparent)` }}>
                      {Number(c.NOTA)}
                    </span>
                    <div className="grade-card__body">
                      <div className="grade-card__top">
                        <h3 className="grade-card__curso">{c.CURSO}</h3>
                        <Badge variant={rend.variant}>{c.RENDIMIENTO}</Badge>
                      </div>
                      {c.COMENTARIO && <p className="grade-card__comment">{c.COMENTARIO}</p>}
                      <span className="grade-card__date">{formatFecha(c.FECHA)}</span>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </>
        ) : (
          <EmptyState
            icon={IconCertificate}
            title="Aún no tienes calificaciones"
            message="Completa tus cursos y rinde el quiz final para que tus notas aparezcan aquí."
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
