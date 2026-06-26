import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import Avatar from '../components/ui/Avatar'
import Spinner from '../components/ui/Spinner'
import { IconMail } from '../components/ui/Icons'
import { getSuscripciones } from '../services/suscripciones.service'
import { useAuth } from '../context/AuthContext'

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

  const fields = [
    { label: 'Nombre', value: nombre },
    { label: 'Correo electrónico', value: usuario?.email || '—' },
    { label: 'ID de alumno', value: usuario?.id_alumno ?? '—' },
    { label: 'Rol', value: 'Estudiante' },
    { label: 'Suscripción', value: subActiva ? `Acadia ${subActiva.PLAN}` : 'Sin plan activo' },
    { label: 'Estado', value: 'Cuenta activa' },
  ]

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Mi perfil</h1>
          <p className="page-head__subtitle">Tu información de cuenta</p>
        </div>
      </header>

      {loading ? (
        <Spinner center label="Cargando tu perfil…" />
      ) : (
        <motion.div className="profile" variants={container} initial="hidden" animate="show">
          <motion.section className="profile-hero" variants={item}>
            <Avatar name={nombre} size="lg" />
            <div className="profile-hero__info">
              <h2 className="profile-hero__name">{nombre}</h2>
              <p className="profile-hero__email"><IconMail width={15} height={15} /> {usuario?.email || '—'}</p>
              <div className="profile-hero__tags">
                <span className="profile-tag">Estudiante</span>
                {subActiva
                  ? <span className="profile-tag profile-tag--pro">Acadia {subActiva.PLAN}</span>
                  : <span className="profile-tag">Plan gratuito</span>}
              </div>
            </div>
          </motion.section>

          <motion.div className="profile-detail" variants={item}>
            <h3 className="profile-detail__title">Información de la cuenta</h3>
            <div className="profile-fields">
              {fields.map((f) => (
                <div key={f.label} className="profile-field">
                  <span className="profile-field__label">{f.label}</span>
                  <span className="profile-field__value">{f.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  )
}

export default Perfil
