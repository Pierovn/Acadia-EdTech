import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { login as loginRequest } from '../services/auth.service'
import { useAuth } from '../context/AuthContext'
import { IconMail, IconLock } from '../components/ui/Icons'
import ladoIzquierdo from '../assets/LadoIzquierdo.png'
import logoAcadia from '../assets/logo-acadia.png'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await loginRequest(email, password)
      login(token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo iniciar sesión')
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
              <span className="auth__top-text">¿No tienes cuenta?</span>
              <Link to="/register" className="auth__top-link">Regístrate</Link>
            </span>
          </div>

          <motion.form className="auth__form" onSubmit={handleSubmit} variants={formV} initial="hidden" animate="show">
            <motion.header className="auth__heading" variants={itemV}>
              <p className="auth__welcome">¡Bienvenido de nuevo!</p>
              <h1 className="auth__title">Inicia sesión en tu cuenta</h1>
            </motion.header>

            <motion.label className="auth__field" variants={itemV}>
              <span className="auth__label">Correo electrónico</span>
              <div className="auth__input-wrap">
                <IconMail className="auth__input-icon" width={18} height={18} />
                <input
                  type="email"
                  className="auth__input"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.label>

            <motion.label className="auth__field" variants={itemV}>
              <span className="auth__label">Contraseña</span>
              <div className="auth__input-wrap">
                <IconLock className="auth__input-icon" width={18} height={18} />
                <input
                  type="password"
                  className="auth__input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </motion.label>

            <motion.div className="auth__options" variants={itemV}>
              <label className="auth__check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Mantener sesión iniciada</span>
              </label>
            </motion.div>

            {error && <p className="acd-error auth__error">{error}</p>}

            <motion.button
              type="submit"
              className="acd-btn acd-btn--primary auth__submit"
              disabled={loading}
              variants={itemV}
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </motion.button>

            <motion.p className="auth__footer" variants={itemV}>© 2026 Acadia · Proyecto Bases de Datos II</motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
