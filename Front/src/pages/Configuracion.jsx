import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import { useAuth } from '../context/AuthContext'

const readPrefs = () => {
  try { return JSON.parse(localStorage.getItem('acd-prefs')) || {} } catch { return {} }
}

const TOGGLES = [
  { k: 'correo', label: 'Notificaciones por correo', hint: 'Avisos de tus cursos y respuestas del foro.' },
  { k: 'novedades', label: 'Novedades y promociones', hint: 'Nuevos cursos, retos y descuentos.' },
  { k: 'resumen', label: 'Resumen semanal de progreso', hint: 'Un correo cada semana con tu avance.' },
]

const Configuracion = () => {
  const { usuario } = useAuth()
  const reduce = useReducedMotion()
  const actual = usuario?.email ? usuario.email.split('@')[0] : ''
  const [nombre, setNombre] = useState(actual)
  const [guardado, setGuardado] = useState(false)
  const [prefs, setPrefs] = useState(() => ({ correo: true, novedades: true, resumen: false, ...readPrefs() }))

  const togglePref = (k) => {
    const next = { ...prefs, [k]: !prefs[k] }
    setPrefs(next)
    try { localStorage.setItem('acd-prefs', JSON.stringify(next)) } catch { /* noop */ }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Configuración</h1>
          <p className="page-head__subtitle">Administra tu cuenta y preferencias</p>
        </div>
      </header>

      <motion.div className="settings" variants={container} initial="hidden" animate="show">
        <motion.form className="settings-card" onSubmit={handleSubmit} variants={item}>
          <h3 className="settings-card__title">Cuenta</h3>

          <label className="settings-field">
            <span className="settings-field__label">Nombre de usuario</span>
            <input
              type="text"
              className="settings-field__input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </label>

          <label className="settings-field">
            <span className="settings-field__label">Correo electrónico</span>
            <input type="email" className="settings-field__input" value={usuario?.email || ''} disabled />
            <span className="settings-field__hint">El correo no se puede modificar.</span>
          </label>

          <div className="settings-card__actions">
            <button type="submit" className="acd-btn acd-btn--primary" disabled={!nombre.trim()}>
              Guardar cambios
            </button>
            {guardado && <span className="settings-card__ok">Cambios guardados</span>}
          </div>
        </motion.form>

        <motion.div className="settings-card" variants={item}>
          <h3 className="settings-card__title">Preferencias</h3>
          {TOGGLES.map((t) => (
            <div key={t.k} className="settings-row">
              <div className="settings-row__text">
                <span className="settings-row__label">{t.label}</span>
                <span className="settings-row__hint">{t.hint}</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={prefs[t.k]} onChange={() => togglePref(t.k)} />
                <span className="switch__track" />
              </label>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Layout>
  )
}

export default Configuracion
