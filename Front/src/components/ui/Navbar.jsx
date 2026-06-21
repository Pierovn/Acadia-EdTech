import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  IconDashboard, IconProfile, IconCourses, IconForum,
  IconSettings, IconLogout,
} from './Icons'
import logoAcadia from '../../assets/logo-acadia.png'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { to: '/perfil', label: 'Perfil', Icon: IconProfile },
  { to: '/catalog', label: 'Cursos', Icon: IconCourses },
  { to: '/foro', label: 'Foro', Icon: IconForum },
  { to: '/configuracion', label: 'Configuración', Icon: IconSettings },
]

const Navbar = () => {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src={logoAcadia} alt="Acadia" className="sidebar__logo-img" />
        <span className="sidebar__name">Acadia</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
          >
            <Icon className="sidebar__icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__cta">
        <div className="sidebar__cta-glow" />
        <p className="sidebar__cta-count">+32 mil</p>
        <p className="sidebar__cta-text">estudiantes aprendiendo en Acadia</p>
      </div>

      <button type="button" className="sidebar__logout" onClick={handleLogout}>
        <IconLogout className="sidebar__icon" />
        <span>{usuario?.email ? 'Cerrar sesión' : 'Salir'}</span>
      </button>
    </aside>
  )
}

export default Navbar
