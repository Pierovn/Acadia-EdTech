import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import Layout from '../components/ui/Layout'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import CourseThumb from '../components/ui/CourseThumb'
import CountUp from '../components/ui/CountUp'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import {
  IconCourses, IconCertificate, IconClock, IconStar, IconChevron,
  IconArrowUpRight, IconPlay, IconPlus, IconCode, IconDatabase, IconDesign,
} from '../components/ui/Icons'
import { getMisCursos } from '../services/matriculas.service'
import { getProgreso } from '../services/progreso.service'
import { getCalificaciones } from '../services/calificaciones.service'
import { abreviar } from '../data/cursos'

const CHART = {
  green: '#1F7A4D',
  track: '#E6EBE8',
}

const novedades = [
  { titulo: 'Nuevo curso: Next.js 15', tag: 'Programación', Icon: IconCode, tone: 'a' },
  { titulo: 'Webinar de PL/SQL avanzado', tag: 'Base de Datos', Icon: IconDatabase, tone: 'b' },
  { titulo: 'Reto semanal de diseño UI', tag: 'Diseño', Icon: IconDesign, tone: 'c' },
]

const estadoVariant = (estado) => {
  if (estado === 'COMPLETADO') return 'success'
  if (estado === 'ACTIVO') return 'warning'
  return 'danger'
}

const estadoLabel = (estado) => {
  if (estado === 'COMPLETADO') return 'Completado'
  if (estado === 'ACTIVO') return 'En progreso'
  return 'Pendiente'
}

const Dashboard = () => {
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

  const completados = cursos.filter((c) => c.ESTADO === 'COMPLETADO').length
  const enProgreso = cursos.filter((c) => c.ESTADO === 'ACTIVO').length
  const pendientes = Math.max(0, cursos.length - completados - enProgreso)
  const promedioNotas = notas.length
    ? notas.reduce((s, n) => s + Number(n.NOTA || 0), 0) / notas.length
    : null
  const avgProgreso = cursos.length
    ? Math.round(cursos.reduce((s, c) => s + (c.progreso || 0), 0) / cursos.length)
    : 0
  const completionPct = cursos.length ? Math.round((completados / cursos.length) * 100) : 0

  const continuar = useMemo(
    () => [...cursos].sort((a, b) => (b.progreso || 0) - (a.progreso || 0)),
    [cursos]
  )
  const featured = useMemo(
    () => continuar.find((c) => c.ESTADO === 'ACTIVO') || continuar[0] || null,
    [continuar]
  )

  const barData = useMemo(
    () => continuar.slice(0, 8).map((c) => ({ label: abreviar(c.CURSO), value: Math.round(c.progreso || 0) })),
    [continuar]
  )
  const distrib = [
    { name: 'Completados', value: completados, color: 'var(--primary-dark)' },
    { name: 'En progreso', value: enProgreso, color: 'var(--course-yellow)' },
    { name: 'Pendientes', value: pendientes, color: 'var(--border-medium)' },
  ]

  const stats = [
    { key: 'mat', label: 'Cursos matriculados', value: cursos.length, Icon: IconCourses, caption: 'Tu ruta de aprendizaje', to: '/catalog', highlight: true },
    { key: 'comp', label: 'Completados', value: completados, Icon: IconCertificate, caption: '¡Buen avance!', to: '/calificaciones' },
    { key: 'prog', label: 'En progreso', value: enProgreso, Icon: IconClock, caption: 'Activos ahora', to: '/dashboard' },
    { key: 'nota', label: 'Promedio de notas', value: promedioNotas, Icon: IconStar, caption: 'Tu desempeño', to: '/calificaciones', isNota: true },
  ]

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }
  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay },
  })

  return (
    <Layout>
      <div className="dash-head">
        <div className="dash-head__text">
          <h1 className="dash-head__title">Dashboard</h1>
          <p className="dash-head__sub">Organiza, avanza y completa tus cursos a tu ritmo.</p>
        </div>
        <div className="dash-head__actions">
          <button type="button" className="acd-btn acd-btn--ghost" onClick={() => navigate('/calificaciones')}>
            Calificaciones
          </button>
          <button type="button" className="acd-btn acd-btn--primary" onClick={() => navigate('/catalog')}>
            <IconPlus width={18} height={18} /> Explorar cursos
          </button>
        </div>
      </div>

      {loading && <Spinner center label="Cargando tu panel…" />}
      {error && <p className="acd-error">{error}</p>}

      {!loading && !error && (
        <>
          <motion.div className="dash-stats" variants={container} initial="hidden" animate="show">
            {stats.map((s) => (
              <motion.button
                key={s.key}
                type="button"
                className={s.highlight ? 'stat stat--hl' : 'stat'}
                variants={item}
                onClick={() => navigate(s.to)}
              >
                <span className="stat__top">
                  <span className="stat__icon"><s.Icon width={20} height={20} /></span>
                  <span className="stat__arrow"><IconArrowUpRight width={16} height={16} /></span>
                </span>
                <span className="stat__value">
                  {s.isNota
                    ? (s.value === null ? '—' : <CountUp value={s.value} decimals={1} />)
                    : <CountUp value={s.value} />}
                </span>
                <span className="stat__label">{s.label}</span>
                <span className="stat__caption">{s.caption}</span>
              </motion.button>
            ))}
          </motion.div>

          <div className="dash-row dash-row--a">
            <motion.section className="card analytics" {...rise(0.06)}>
              <div className="card__head">
                <h3 className="card__title">Tu progreso por curso</h3>
              </div>
              {barData.length > 0 ? (
                <div className="analytics__plot">
                  {barData.map((b, i) => (
                    <div className="abar" key={b.label + i}>
                      <div className="abar__track">
                        <div className="abar__fill" style={{ height: `${b.value}%` }}>
                          <span className="abar__badge">{b.value}%</span>
                        </div>
                      </div>
                      <span className="abar__label">{b.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="card__empty">Matricúlate en un curso para ver tu progreso.</p>
              )}
            </motion.section>

            <motion.section className="card reminder" {...rise(0.1)}>
              <h3 className="card__title">Continuar aprendiendo</h3>
              {featured ? (
                <div className="reminder__body">
                  <span className="reminder__eyebrow">{featured.CATEGORIA} · {featured.NIVEL}</span>
                  <h4 className="reminder__course">{featured.CURSO}</h4>
                  <ProgressBar value={featured.progreso} />
                  <button
                    type="button"
                    className="reminder__cta"
                    onClick={() => navigate(`/cursos/${featured.ID_CURSO}`)}
                  >
                    <IconPlay width={18} height={18} /> Continuar
                  </button>
                </div>
              ) : (
                <p className="card__empty">Matricúlate en un curso para empezar.</p>
              )}
            </motion.section>

            <motion.section className="card news" {...rise(0.14)}>
              <div className="card__head">
                <h3 className="card__title">Novedades</h3>
              </div>
              <ul className="news__list">
                {novedades.map((n) => (
                  <li className="news__row" key={n.titulo}>
                    <span className={`news__icon news__icon--${n.tone}`}>
                      <n.Icon width={18} height={18} />
                    </span>
                    <div className="news__text">
                      <p className="news__title">{n.titulo}</p>
                      <span className="news__tag">{n.tag}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          <div className="dash-row dash-row--b">
            <motion.section className="card courselist" {...rise(0.06)}>
              <div className="card__head">
                <h3 className="card__title">Mis cursos</h3>
                <button type="button" className="card__action" onClick={() => navigate('/catalog')}>
                  Ver catálogo
                </button>
              </div>
              {continuar.length > 0 ? (
                <ul className="courselist__list">
                  {continuar.map((c) => (
                    <li className="crow" key={c.ID_MATRICULA}>
                      <CourseThumb idCurso={c.ID_CURSO} categoria={c.CATEGORIA} titulo={c.CURSO} size="row" />
                      <div className="crow__main">
                        <p className="crow__title">{c.CURSO}</p>
                        <span className="crow__meta">{c.CATEGORIA} · {c.NIVEL}</span>
                      </div>
                      <div className="crow__status">
                        <Badge variant={estadoVariant(c.ESTADO)}>{estadoLabel(c.ESTADO)}</Badge>
                        <span className="crow__pct">{Math.round(c.progreso || 0)}%</span>
                      </div>
                      <button
                        type="button"
                        className="crow__go"
                        onClick={() => navigate(`/cursos/${c.ID_CURSO}`)}
                        aria-label={`Abrir ${c.CURSO}`}
                      >
                        <IconChevron width={16} height={16} />
                      </button>
                    </li>
                  ))}
                </ul>
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

            <motion.section className="card gauge" {...rise(0.1)}>
              <h3 className="card__title">Progreso general</h3>
              <div className="gauge__wrap">
                <ResponsiveContainer width="100%" height={172}>
                  <RadialBarChart
                    innerRadius="72%"
                    outerRadius="100%"
                    startAngle={220}
                    endAngle={-40}
                    data={[{ value: completionPct }]}
                    barSize={16}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background={{ fill: CHART.track }} dataKey="value" cornerRadius={20} fill={CHART.green} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="gauge__center">
                  <span className="gauge__pct">{completionPct}%</span>
                  <span className="gauge__cap">completados</span>
                </div>
              </div>
              <ul className="gauge__legend">
                {distrib.map((d) => (
                  <li className="gauge__leg" key={d.name}>
                    <span className="gauge__dot" style={{ backgroundColor: d.color }} />
                    <span className="gauge__leg-name">{d.name}</span>
                    <span className="gauge__leg-val">{d.value}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section className="card spotlight" {...rise(0.14)}>
              <span className="spotlight__label">Avance global</span>
              <div className="spotlight__value"><CountUp value={avgProgreso} />%</div>
              <span className="spotlight__sub">promedio de avance en tus cursos</span>
              <div className="spotlight__bar">
                <span className="spotlight__fill" style={{ width: `${avgProgreso}%` }} />
              </div>
              <div className="spotlight__foot">
                <span className="spotlight__chip"><strong>{completados}</strong> completados</span>
                <span className="spotlight__chip"><strong>{enProgreso}</strong> en curso</span>
              </div>
            </motion.section>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Dashboard
