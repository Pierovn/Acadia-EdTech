import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import { IconMail, IconCheckCircle } from '../components/ui/Icons'
import { getSuscripciones } from '../services/suscripciones.service'
import { useAuth } from '../context/AuthContext'

const beneficios = [
  'Acceso a todos los cursos de tu plan',
  'Certificado al completar cada curso',
  'Comunidad y foros de apoyo',
  'Aprende a tu propio ritmo, sin límites',
]

const Perfil = () => {
  const { usuario } = useAuth()
  const reduce = useReducedMotion()
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSuscripciones().then(setSubs).catch(() => setSubs([])).finally(() => setLoading(false))
  }, [])

  const nombre = usuario?.email ? usuario.email.split('@')[0] : 'Estudiante'
  const subActiva = subs.find((s) => s.ESTADO === 'ACTIVO')

  const cuenta = [
    { label: 'ID de alumno', value: usuario?.id_alumno ?? '—' },
    { label: 'Rol', value: 'Estudiante' },
    { label: 'Estado de la cuenta', value: 'Activa' },
    { label: 'Plan actual', value: subActiva ? `Acadia ${subActiva.PLAN}` : 'Plan gratuito' },
  ]

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Mi perfil</h1>
          <p className="page-head__subtitle">Tu identidad en Acadia</p>
        </div>
      </header>

      {loading ? (
        <Spinner center label="Cargando tu perfil…" />
      ) : (
        <motion.div className="profile" variants={container} initial="hidden" animate="show">
          <motion.section className="profile-id" variants={item}>
            <Avatar name={nombre} size="lg" />
            <div className="profile-id__info">
              <h2 className="profile-id__name">{nombre}</h2>
              <p className="profile-id__mail"><IconMail width={15} height={15} /> {usuario?.email || '—'}</p>
              <div className="profile-id__tags">
                <Badge variant="success">Estudiante</Badge>
                {subActiva
                  ? <Badge variant="primary">Acadia {subActiva.PLAN}</Badge>
                  : <Badge variant="muted">Plan gratuito</Badge>}
              </div>
            </div>
          </motion.section>

          <div className="profile-grid">
            <motion.section className="profile-card" variants={item}>
              <h3 className="profile-card__title">Datos de la cuenta</h3>
              <ul className="profile-rows">
                {cuenta.map((c) => (
                  <li key={c.label} className="profile-row">
                    <span className="profile-row__label">{c.label}</span>
                    <span className="profile-row__value">{c.value}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <div className="profile-col">
              <motion.section className="profile-card" variants={item}>
                <h3 className="profile-card__title">Sobre mí</h3>
                <p className="profile-about">
                  ¡Hola! Soy <strong>{nombre}</strong>, parte de la comunidad Acadia.
                  Aprendo nuevas habilidades a mi propio ritmo y construyo mi camino paso a
                  paso. Aquí tienes el resumen de mi cuenta y mi membresía.
                </p>
              </motion.section>

              <motion.section className="profile-card" variants={item}>
                <div className="profile-plan__head">
                  <h3 className="profile-card__title">Tu membresía</h3>
                  <Badge variant={subActiva ? 'primary' : 'muted'}>
                    {subActiva ? `Acadia ${subActiva.PLAN}` : 'Gratuito'}
                  </Badge>
                </div>
                <ul className="profile-perks">
                  {beneficios.map((b) => (
                    <li key={b} className="profile-perk">
                      <IconCheckCircle width={18} height={18} /> {b}
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>
          </div>
        </motion.div>
      )}
    </Layout>
  )
}

export default Perfil
