import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { login as loginRequest } from '../services/auth.service'
import { useAuth } from '../context/AuthContext'
import { IconMail, IconLock, IconEye, IconEyeOff } from '../components/ui/Icons'
import ladoDerecho from '../assets/LadoDerecho.png'
import logoAcadia from '../assets/logo-acadia.png'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
  const [forgot, setForgot] = useState(false)
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

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }
  const visual = { hidden: { opacity: 0, scale: reduce ? 1 : 1.06 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } }

  return (
    <div className="auth">
      <div className="auth__card">
      <div className="auth__panel">
        <motion.form className="auth__form" onSubmit={handleSubmit} variants={container} initial="hidden" animate="show">
          <motion.img src={logoAcadia} alt="Acadia" className="auth__logo" variants={item} />

          <motion.div className="auth__heading" variants={item}>
            <h1 className="auth__title">Inicia sesión</h1>
            <p className="auth__subtitle">Retoma tus cursos y sigue aprendiendo a tu ritmo.</p>
          </motion.div>

          <motion.label className="auth__field" variants={item}>
            <span className="auth__label">Correo electrónico</span>
            <div className="auth__input-wrap">
              <IconMail className="auth__input-icon" width={18} height={18} />
              <input type="email" className="auth__input" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </motion.label>

          <motion.label className="auth__field" variants={item}>
            <span className="auth__label">Contraseña</span>
            <div className="auth__input-wrap">
              <IconLock className="auth__input-icon" width={18} height={18} />
              <input type={showPass ? 'text' : 'password'} className="auth__input" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="auth__eye" onClick={() => setShowPass((s) => !s)} aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPass ? <IconEyeOff width={18} height={18} /> : <IconEye width={18} height={18} />}
              </button>
            </div>
          </motion.label>

          <motion.div className="auth__options" variants={item}>
            <label className="auth__check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Recordarme</span>
            </label>
            <button type="button" className="auth__forgot" onClick={() => setForgot((f) => !f)}>¿Olvidaste tu contraseña?</button>
          </motion.div>

          {forgot && <motion.p className="auth__hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Escríbenos a soporte@acadia.pe y te ayudamos a restablecerla.</motion.p>}
          {error && <p className="acd-error auth__error">{error}</p>}

          <motion.button
            type="submit"
            className="acd-btn acd-btn--primary auth__submit"
            disabled={loading}
            variants={item}
            whileHover={reduce ? undefined : { y: -1 }}
            whileTap={reduce ? undefined : { scale: 0.99 }}
          >
            {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </motion.button>

          <motion.p className="auth__alt" variants={item}>
            ¿No tienes cuenta? <Link to="/register" className="auth__alt-link">Crea una cuenta</Link>
          </motion.p>
        </motion.form>
      </div>

      <motion.aside className="auth__visual" variants={visual} initial="hidden" animate="show">
        <img src={ladoDerecho} alt="Estudiante aprendiendo en Acadia" className="auth__visual-img" />
      </motion.aside>
      </div>
    </div>
  )
}

export default Login
