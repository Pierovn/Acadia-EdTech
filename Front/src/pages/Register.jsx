import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerRequest } from '../services/auth.service'
import { IconMail, IconLock, IconProfile } from '../components/ui/Icons'
import ilustracion from '../assets/login-illustration.jpg'

const Register = () => {
  const navigate = useNavigate()
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

  return (
    <div className="auth">
      <div className="auth__visual" style={{ backgroundImage: `url(${ilustracion})` }}>
        <div className="auth__visual-overlay">
          <h1 className="auth__brand">Acadia</h1>
          <p className="auth__tagline">Crea tu cuenta y empieza hoy.</p>
        </div>
      </div>

      <div className="auth__panel">
        <form className="auth__form" onSubmit={handleSubmit}>
          <h2 className="auth__title">Crear Cuenta</h2>

          <div className="auth__row">
            <label className="auth__field">
              <span className="auth__label">Nombre</span>
              <div className="auth__input-wrap">
                <IconProfile className="auth__input-icon" />
                <input type="text" name="nombre" className="auth__input" placeholder="Piero" value={form.nombre} onChange={onChange} required />
              </div>
            </label>
            <label className="auth__field">
              <span className="auth__label">Apellido</span>
              <div className="auth__input-wrap">
                <IconProfile className="auth__input-icon" />
                <input type="text" name="apellido" className="auth__input" placeholder="Villón" value={form.apellido} onChange={onChange} required />
              </div>
            </label>
          </div>

          <label className="auth__field">
            <span className="auth__label">Correo Electrónico</span>
            <div className="auth__input-wrap">
              <IconMail className="auth__input-icon" />
              <input type="email" name="email" className="auth__input" placeholder="tucorreo@ejemplo.com" value={form.email} onChange={onChange} required />
            </div>
          </label>

          <label className="auth__field">
            <span className="auth__label">Contraseña</span>
            <div className="auth__input-wrap">
              <IconLock className="auth__input-icon" />
              <input type="password" name="password" className="auth__input" placeholder="••••••••" value={form.password} onChange={onChange} required />
            </div>
          </label>

          {error && <p className="acd-error">{error}</p>}

          <Link to="/login" className="auth__link">¿Ya tienes cuenta? Inicia sesión</Link>

          <button type="submit" className="acd-btn acd-btn--primary auth__submit" disabled={loading}>
            {loading ? 'Creando…' : 'Registrarme'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
