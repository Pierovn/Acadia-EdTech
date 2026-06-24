import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Avatar from './Avatar'
import {
  IconDashboard, IconProfile, IconCourses, IconForum,
  IconSettings, IconLogout, IconCertificate, IconCreditCard,
} from './Icons'
import logoAcadia from '../../assets/logo-acadia.png'

const grupos = [
  {
    titulo: 'Aprendizaje',
    items: [
      { to: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
      { to: '/catalog', label: 'Cursos', Icon: IconCourses },
      { to: '/foro', label: 'Foro', Icon: IconForum },
      { to: '/calificaciones', label: 'Calificaciones', Icon: IconCertificate },
    ],
  },
  {
    titulo: 'Cuenta',
    items: [
      { to: '/perfil', label: 'Perfil', Icon: IconProfile },
      { to: '/checkout', label: 'Suscripción', Icon: IconCreditCard },
      { to: '/configuracion', label: 'Configuración', Icon: IconSettings },
    ],
  },
]

const Navbar = () => {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const nombre = usuario?.email ? usuario.email.split('@')[0] : 'Invitado'

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src={logoAcadia} alt="Acadia" className="sidebar__logo" />
      </div>

      <nav className="sidebar__nav">
        {grupos.map((grupo) => (
          <div className="sidebar__group" key={grupo.titulo}>
            <span className="sidebar__section">{grupo.titulo}</span>
            {grupo.items.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
              >
                <span className="sidebar__tile">
                  <Icon className="sidebar__icon" width={18} height={18} />
                </span>
                <span className="sidebar__label">{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar__foot">
        <div className="sidebar__user">
          <Avatar name={nombre} size="md" />
          <span className="sidebar__user-info">
            <span className="sidebar__user-name">{nombre}</span>
            <span className="sidebar__user-mail">{usuario?.email || 'Sesión activa'}</span>
          </span>
        </div>

        <button type="button" className="sidebar__logout" onClick={handleLogout}>
          <IconLogout className="sidebar__icon" width={18} height={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}

export default Navbar
