import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { register as registerRequest } from '../services/auth.service'
import { IconMail, IconLock, IconProfile, IconEye, IconEyeOff } from '../components/ui/Icons'
import ladoDerecho from '../assets/LadoDerecho.png'
import logoAcadia from '../assets/logo-acadia.png'

const Register = () => {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
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

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }
  const visual = { hidden: { opacity: 0, scale: reduce ? 1 : 1.06 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } }

  return (
    <div className="auth">
      <div className="auth__panel">
        <motion.form className="auth__form" onSubmit={handleSubmit} variants={container} initial="hidden" animate="show">
          <motion.img src={logoAcadia} alt="Acadia" className="auth__logo" variants={item} />

          <motion.div className="auth__heading" variants={item}>
            <h1 className="auth__title">Crea tu cuenta</h1>
            <p className="auth__subtitle">Empieza gratis y aprende con cursos prácticos desde hoy.</p>
          </motion.div>

          <motion.div className="auth__row" variants={item}>
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

          <motion.label className="auth__field" variants={item}>
            <span className="auth__label">Correo electrónico</span>
            <div className="auth__input-wrap">
              <IconMail className="auth__input-icon" width={18} height={18} />
              <input type="email" name="email" className="auth__input" placeholder="correo@ejemplo.com" value={form.email} onChange={onChange} required />
            </div>
          </motion.label>

          <motion.label className="auth__field" variants={item}>
            <span className="auth__label">Contraseña</span>
            <div className="auth__input-wrap">
              <IconLock className="auth__input-icon" width={18} height={18} />
              <input type={showPass ? 'text' : 'password'} name="password" className="auth__input" placeholder="Crea una contraseña" value={form.password} onChange={onChange} required />
              <button type="button" className="auth__eye" onClick={() => setShowPass((s) => !s)} aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPass ? <IconEyeOff width={18} height={18} /> : <IconEye width={18} height={18} />}
              </button>
            </div>
          </motion.label>

          {error && <p className="acd-error auth__error">{error}</p>}

          <motion.button
            type="submit"
            className="acd-btn acd-btn--primary auth__submit"
            disabled={loading}
            variants={item}
            whileHover={reduce ? undefined : { y: -1 }}
            whileTap={reduce ? undefined : { scale: 0.99 }}
          >
            {loading ? 'Creando…' : 'Crear cuenta'}
          </motion.button>

          <motion.p className="auth__alt" variants={item}>
            ¿Ya tienes cuenta? <Link to="/login" className="auth__alt-link">Inicia sesión</Link>
          </motion.p>
        </motion.form>
      </div>

      <motion.aside className="auth__visual" variants={visual} initial="hidden" animate="show">
        <img src={ladoDerecho} alt="Estudiante aprendiendo en Acadia" className="auth__visual-img" />
      </motion.aside>
    </div>
  )
}

export default Register
