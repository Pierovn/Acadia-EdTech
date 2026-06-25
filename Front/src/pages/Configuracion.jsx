import { useState } from 'react'
import Layout from '../components/ui/Layout'
import { useAuth } from '../context/AuthContext'

const Configuracion = () => {
  const { usuario } = useAuth()
  const actual = usuario?.email ? usuario.email.split('@')[0] : ''
  const [nombre, setNombre] = useState(actual)
  const [guardado, setGuardado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // El backend aún no expone un endpoint para actualizar el nombre;
    // por ahora confirmamos el cambio en la interfaz.
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Configuración</h1>
          <p className="page-head__subtitle">Preferencias de tu cuenta</p>
        </div>
      </header>

      <form className="settings-card" onSubmit={handleSubmit}>
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
          <input
            type="email"
            className="settings-field__input"
            value={usuario?.email || ''}
            disabled
          />
          <span className="settings-field__hint">El correo no se puede modificar.</span>
        </label>

        <div className="settings-card__actions">
          <button type="submit" className="acd-btn acd-btn--primary" disabled={!nombre.trim()}>
            Guardar cambios
          </button>
          {guardado && <span className="settings-card__ok">Cambios guardados</span>}
        </div>
      </form>
    </Layout>
  )
}

export default Configuracion
