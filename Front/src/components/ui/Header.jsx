import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Avatar from './Avatar'
import { IconSearch, IconMail, IconBell } from './Icons'

// Barra superior (head): buscador a la izquierda, acciones y perfil a la derecha.
const Header = () => {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const nombre = usuario?.email ? usuario.email.split('@')[0] : 'Invitado'

  const onSearch = (e) => {
    e.preventDefault()
    navigate('/catalog')
  }

  return (
    <header className="topbar">
      <form className="topbar__search" onSubmit={onSearch} role="search">
        <IconSearch className="topbar__search-icon" width={18} height={18} />
        <input
          className="topbar__search-input"
          type="search"
          placeholder="Buscar curso…"
          aria-label="Buscar curso"
        />
        <span className="topbar__kbd">Ctrl F</span>
      </form>

      <div className="topbar__actions">
        <button type="button" className="topbar__icon-btn" aria-label="Mensajes">
          <IconMail width={19} height={19} />
        </button>
        <button type="button" className="topbar__icon-btn" aria-label="Notificaciones">
          <IconBell width={19} height={19} />
          <span className="topbar__dot" />
        </button>

        <button type="button" className="topbar__profile" onClick={() => navigate('/perfil')}>
          <Avatar name={nombre} size="sm" />
          <span className="topbar__profile-info">
            <span className="topbar__profile-name">{nombre}</span>
            <span className="topbar__profile-mail">{usuario?.email || 'Sesión activa'}</span>
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
