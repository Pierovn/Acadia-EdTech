import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerRequest } from '../services/auth.service'
import { IconMail, IconLock, IconProfile, IconCertificate, IconDatabase, IconForum } from '../components/ui/Icons'
import ilustracion from '../assets/login-illustration.jpg'
import logoAcadia from '../assets/logo-acadia.png'

const highlights = [
  { Icon: IconDatabase, text: 'Cursos de Oracle y MongoDB' },
  { Icon: IconCertificate, text: 'Certificado al completar cada curso' },
  { Icon: IconForum, text: 'Comunidad activa en los foros' },
]

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
      <span className="auth__shape auth__shape--top" aria-hidden="true" />
      <span className="auth__shape auth__shape--bottom" aria-hidden="true" />

      <div className="auth__card">
        {/* Mitad visual */}
        <aside className="auth__visual" style={{ backgroundImage: `url(${ilustracion})` }}>
          <div className="auth__visual-veil" aria-hidden="true" />
          <div className="auth__brand">
            <img src={logoAcadia} alt="Acadia" className="auth__logo" />
            <span className="auth__brand-name">Acadia</span>
          </div>
          <div className="auth__visual-body">
            <h2 className="auth__visual-title">Únete a Acadia hoy.</h2>
            <p className="auth__visual-sub">
              Crea tu cuenta gratis y empieza a aprender con cursos prácticos desde el primer día.
            </p>
            <ul className="auth__highlights">
              {highlights.map(({ Icon, text }) => (
                <li key={text} className="auth__highlight">
                  <span className="auth__highlight-icon"><Icon width={18} height={18} /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Mitad formulario */}
        <div className="auth__panel">
          <div className="auth__top">
            <span className="auth__top-text">¿Ya tienes una cuenta?</span>
            <Link to="/login" className="auth__top-link">Inicia sesión aquí</Link>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            <header className="auth__heading">
              <p className="auth__welcome">Empieza gratis</p>
              <h1 className="auth__title">Crea tu cuenta</h1>
            </header>

            <div className="auth__row">
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
            </div>

            <label className="auth__field">
              <span className="auth__label">Correo electrónico</span>
              <div className="auth__input-wrap">
                <IconMail className="auth__input-icon" width={18} height={18} />
                <input type="email" name="email" className="auth__input" placeholder="tucorreo@ejemplo.com" value={form.email} onChange={onChange} required />
              </div>
            </label>

            <label className="auth__field">
              <span className="auth__label">Contraseña</span>
              <div className="auth__input-wrap">
                <IconLock className="auth__input-icon" width={18} height={18} />
                <input type="password" name="password" className="auth__input" placeholder="••••••••" value={form.password} onChange={onChange} required />
              </div>
            </label>

            {error && <p className="acd-error auth__error">{error}</p>}

            <button
              type="submit"
              className="acd-btn acd-btn--primary auth__submit"
              disabled={loading}
            >
              {loading ? 'Creando…' : 'Crear cuenta'}
            </button>

            <p className="auth__footer">© 2026 Acadia · Proyecto Bases de Datos II</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
