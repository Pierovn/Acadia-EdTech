import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { register as registerRequest } from '../services/auth.service'
import { IconMail, IconLock, IconProfile } from '../components/ui/Icons'
import ladoIzquierdo from '../assets/LadoIzquierdo.png'
import logoAcadia from '../assets/logo-acadia.png'

const Register = () => {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerRequest(form.nombre, form.apellido, form.email, form.password)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo completar el registro')
    } finally {
      setLoading(false)
    }
  }

  const cardV = { hidden: { opacity: 0, y: reduce ? 0 : 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }
  const imgV = { hidden: { opacity: 0, x: reduce ? 0 : -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } }
  const formV = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }
  const itemV = { hidden: { opacity: 0, y: reduce ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

  return (
    <div className="auth">
      <motion.div className="auth__card" variants={cardV} initial="hidden" animate="show">
        <motion.aside className="auth__visual" variants={imgV} initial="hidden" animate="show">
          <img src={ladoIzquierdo} alt="Acadia — aprende, construye, crece" className="auth__visual-img" />
        </motion.aside>

        <div className="auth__panel">
          <div className="auth__top">
            <img src={logoAcadia} alt="Acadia" className="auth__logo" />
            <span className="auth__top-cta">
              <span className="auth__top-text">¿Ya tienes cuenta?</span>
              <Link to="/login" className="auth__top-link">Inicia sesión</Link>
            </span>
          </div>

          <motion.form className="auth__form" onSubmit={handleSubmit} variants={formV} initial="hidden" animate="show">
            <motion.header className="auth__heading" variants={itemV}>
              <p className="auth__welcome">Empieza gratis</p>
              <h1 className="auth__title">Crea tu cuenta</h1>
            </motion.header>

            <motion.div className="auth__row" variants={itemV}>
              <label className="auth__field">
                <span className="auth__label">Nombre</span>
                <div className="auth__input-wrap">
                  <IconProfile className="auth__input-icon" width={18} height={18} />
                  <input type="text" name="nombre" className="auth__input" placeholder="Piero" value={form.nombre} onChange={onChange} required />
                </div>
              </label>
              <label className="auth__field">
                <span className="auth__label">Apellido</span>
                <div className="auth__input-wrap">
                  <IconProfile className="auth__input-icon" width={18} height={18} />
                  <input type="text" name="apellido" className="auth__input" placeholder="Villón" value={form.apellido} onChange={onChange} required />
                </div>
              </label>
            </motion.div>

            <motion.label className="auth__field" variants={itemV}>
              <span className="auth__label">Correo electrónico</span>
              <div className="auth__input-wrap">
                <IconMail className="auth__input-icon" width={18} height={18} />
                <input type="email" name="email" className="auth__input" placeholder="tucorreo@ejemplo.com" value={form.email} onChange={onChange} required />
              </div>
            </motion.label>

            <motion.label className="auth__field" variants={itemV}>
              <span className="auth__label">Contraseña</span>
              <div className="auth__input-wrap">
                <IconLock className="auth__input-icon" width={18} height={18} />
                <input type="password" name="password" className="auth__input" placeholder="••••••••" value={form.password} onChange={onChange} required />
              </div>
            </motion.label>

            {error && <p className="acd-error auth__error">{error}</p>}

            <motion.button
              type="submit"
              className="acd-btn acd-btn--primary auth__submit"
              disabled={loading}
              variants={itemV}
            >
              {loading ? 'Creando…' : 'Crear cuenta'}
            </motion.button>

            <motion.p className="auth__footer" variants={itemV}>© 2026 Acadia · Proyecto Bases de Datos II</motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
