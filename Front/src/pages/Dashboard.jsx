import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Layout from '../components/ui/Layout'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import CourseThumb from '../components/ui/CourseThumb'
import CountUp from '../components/ui/CountUp'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { IconCourses, IconCertificate, IconClock, IconChevron, IconStar } from '../components/ui/Icons'
import { getMisCursos } from '../services/matriculas.service'
import { getProgreso } from '../services/progreso.service'
import { getCalificaciones } from '../services/calificaciones.service'
import { abreviar } from '../data/cursos'
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

const CHART = {
  progreso: '#F6C68A',
  aprobado: '#5C8A6A',
  desaprobado: '#C76B5E',
  bar: '#DF9F52',
  axis: '#7A6A5C',
}

const Dashboard = () => {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [cursos, setCursos] = useState([])
  const [notas, setNotas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargar = async () => {
      try {
        const [matriculas, calificaciones] = await Promise.all([
          getMisCursos(),
          getCalificaciones().catch(() => []),
        ])
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
        setNotas(calificaciones)
      } catch (err) {
        setError(err.response?.data?.error || 'No se pudieron cargar tus cursos')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  const notaPorCurso = useMemo(() => {
    const map = {}
    notas.forEach((n) => { map[n.CURSO] = Number(n.NOTA) })
    return map
  }, [notas])

  const completados = cursos.filter((c) => c.ESTADO === 'COMPLETADO').length
  const enProgreso = cursos.filter((c) => c.ESTADO === 'ACTIVO').length
  const promedioNotas = notas.length
    ? notas.reduce((s, n) => s + Number(n.NOTA || 0), 0) / notas.length
    : null

  const chart = useMemo(() => {
    let proceso = 0
    let aprobados = 0
    let desaprobados = 0
    cursos.forEach((c) => {
      const nota = notaPorCurso[c.CURSO]
      if (nota === undefined) proceso += 1
      else if (nota >= 11) aprobados += 1
      else desaprobados += 1
    })
    return [
      { name: 'En progreso', value: proceso, color: CHART.progreso },
      { name: 'Aprobados', value: aprobados, color: CHART.aprobado },
      { name: 'Desaprobados', value: desaprobados, color: CHART.desaprobado },
    ].filter((d) => d.value > 0)
  }, [cursos, notaPorCurso])

  const barData = useMemo(
    () => [...cursos]
      .sort((a, b) => (b.progreso || 0) - (a.progreso || 0))
      .map((c) => ({ name: abreviar(c.CURSO), progreso: c.progreso || 0 })),
    [cursos]
  )

  const continuar = useMemo(
    () => [...cursos].sort((a, b) => (b.progreso || 0) - (a.progreso || 0)),
    [cursos]
  )

  const stats = [
    { label: 'Cursos matriculados', value: cursos.length, Icon: IconCourses, tone: 'amber' },
    { label: 'En progreso', value: enProgreso, Icon: IconClock, tone: 'orange' },
    { label: 'Completados', value: completados, Icon: IconCertificate, tone: 'green' },
    { label: 'Promedio de notas', value: promedioNotas, Icon: IconStar, tone: 'gold', isNota: true },
  ]

  const nombre = usuario?.email ? usuario.email.split('@')[0] : ''

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <Layout>
      <motion.section
        className="dash-hero"
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dash-hero__left">
          <Avatar name={nombre || 'Acadia'} size="lg" />
          <div className="dash-hero__text">
            <span className="dash-hero__eyebrow">Tu panel</span>
            <h1 className="dash-hero__title">Hola{nombre ? `, ${nombre}` : ''}</h1>
            <p className="dash-hero__sub">Continúa donde lo dejaste y sigue avanzando a tu ritmo.</p>
          </div>
        </div>
        <button type="button" className="acd-btn dash-hero__cta" onClick={() => navigate('/catalog')}>
          Explorar cursos
        </button>
      </motion.section>

      {loading && <Spinner center label="Cargando tu panel…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        <>
          <motion.div className="dash-stats" variants={container} initial="hidden" animate="show">
            {stats.map((s) => (
              <motion.div key={s.label} className={`stat-card stat-card--${s.tone}`} variants={item}>
                <span className="stat-card__icon"><s.Icon width={20} height={20} /></span>
                <span className="stat-card__value">
                  {s.isNota
                    ? (s.value === null ? '—' : <CountUp value={s.value} decimals={1} />)
                    : <CountUp value={s.value} />}
                </span>
                <span className="stat-card__label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="dash-charts">
            <motion.div
              className="chart-card chart-card--chart"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <h3 className="chart-card__title">Tu progreso por curso</h3>
              {barData.length > 0 ? (
                <div className="chart-card__plot">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical" margin={{ left: 4, right: 48, top: 4, bottom: 4 }}>
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={120}
                        tick={{ fontSize: 13, fill: '#2A2018' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip formatter={(v) => [`${v}%`, 'Avance']} cursor={{ fill: 'rgba(42,32,24,0.04)' }} />
                      <Bar
                        dataKey="progreso"
                        fill={CHART.bar}
                        radius={[0, 8, 8, 0]}
                        barSize={20}
                        label={{ position: 'right', fill: '#7A6A5C', fontSize: 12, fontWeight: 600, formatter: (v) => `${v}%` }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="chart-card__empty">Matricúlate en un curso para ver tu progreso.</p>
              )}
            </motion.div>

            <motion.div
              className="chart-card"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <h3 className="chart-card__title">Distribución de tus cursos</h3>
              {chart.length > 0 ? (
                <>
                  <div className="chart-card__wrap">
                    <ResponsiveContainer width="100%" height={190}>
                      <PieChart>
                        <Pie data={chart} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={3} stroke="none">
                          {chart.map((d) => <Cell key={d.name} fill={d.color} />)}
                        </Pie>
                        <Tooltip formatter={(v, n) => [`${v} curso${v === 1 ? '' : 's'}`, n]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="chart-card__center">
                      <span className="chart-card__total">{cursos.length}</span>
                      <span className="chart-card__total-label">cursos</span>
                    </div>
                  </div>
                  <ul className="chart-legend">
                    {chart.map((d) => (
                      <li key={d.name} className="chart-legend__item">
                        <span className="chart-legend__dot" style={{ backgroundColor: d.color }} />
                        <span className="chart-legend__name">{d.name}</span>
                        <span className="chart-legend__value">{d.value}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="chart-card__empty">Matricúlate en un curso para ver tu distribución.</p>
              )}
            </motion.div>
          </div>

          <div className="dash-grid">
            <motion.section
              className="dash-courses"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <h2 className="dashboard__section-title">Continuar aprendiendo</h2>
              {continuar.length > 0 ? (
                <div className="dashboard__courses">
                  {continuar.map((c) => (
                    <article key={c.ID_MATRICULA} className="mycourse">
                      <CourseThumb idCurso={c.ID_CURSO} categoria={c.CATEGORIA} titulo={c.CURSO} size="row" />
                      <div className="mycourse__main">
                        <div className="mycourse__top">
                          <h4 className="mycourse__title">{c.CURSO}</h4>
                          <Badge variant={estadoVariant(c.ESTADO)}>{c.ESTADO}</Badge>
                        </div>
                        <p className="mycourse__meta">{c.CATEGORIA} · {c.NIVEL}</p>
                        <ProgressBar value={c.progreso} />
                      </div>
                      <button
                        type="button"
                        className="mycourse__cta"
                        onClick={() => navigate(`/cursos/${c.ID_CURSO}`)}
                      >
                        Continuar <IconChevron width={16} height={16} />
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
            </motion.section>

            <motion.aside
              className="dash-side"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
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
            </motion.aside>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Dashboard
