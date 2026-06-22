import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginRequest } from '../services/auth.service'
import { useAuth } from '../context/AuthContext'
import { IconMail, IconLock, IconCertificate, IconDatabase, IconForum } from '../components/ui/Icons'
import ilustracion from '../assets/login-illustration.jpg'
import logoAcadia from '../assets/logo-acadia.png'

const highlights = [
  { Icon: IconDatabase, text: 'Cursos de Oracle y MongoDB' },
  { Icon: IconCertificate, text: 'Certificado al completar cada curso' },
  { Icon: IconForum, text: 'Comunidad activa en los foros' },
]

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
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
            <h2 className="auth__visual-title">Aprende. Construye. Crece.</h2>
            <p className="auth__visual-sub">
              Retoma tus cursos justo donde los dejaste y sigue avanzando a tu ritmo.
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
            <span className="auth__top-text">¿No tienes una cuenta?</span>
            <Link to="/register" className="auth__top-link">Regístrate aquí</Link>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            <header className="auth__heading">
              <p className="auth__welcome">¡Bienvenido de nuevo!</p>
              <h1 className="auth__title">Inicia sesión en tu cuenta</h1>
            </header>

            <label className="auth__field">
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
            </label>

            <label className="auth__field">
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
            </label>

            <div className="auth__options">
              <label className="auth__check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Mantener sesión iniciada</span>
              </label>
            </div>

            {error && <p className="acd-error auth__error">{error}</p>}

            <button
              type="submit"
              className="acd-btn acd-btn--primary auth__submit"
              disabled={loading}
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>

            <p className="auth__footer">© 2026 Acadia · Proyecto Bases de Datos II</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
