import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginRequest } from '../services/auth.service'
import { useAuth } from '../context/AuthContext'
import { IconMail, IconLock } from '../components/ui/Icons'
import ilustracion from '../assets/login-illustration.jpg'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      <div className="auth__visual" style={{ backgroundImage: `url(${ilustracion})` }}>
        <div className="auth__visual-overlay">
          <h1 className="auth__brand">Acadia</h1>
          <p className="auth__tagline">Aprende. Construye. Crece.</p>
        </div>
      </div>

      <div className="auth__panel">
        <form className="auth__form" onSubmit={handleSubmit}>
          <h2 className="auth__title">Inicio de Sesión</h2>

          <label className="auth__field">
            <span className="auth__label">Correo Electrónico</span>
            <div className="auth__input-wrap">
              <IconMail className="auth__input-icon" />
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
              <IconLock className="auth__input-icon" />
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

          {error && <p className="acd-error">{error}</p>}

          <Link to="/register" className="auth__link">¿Necesitas una Cuenta?</Link>

          <button type="submit" className="acd-btn acd-btn--primary auth__submit" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
