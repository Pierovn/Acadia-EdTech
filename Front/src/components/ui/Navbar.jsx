import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Avatar from './Avatar'
import {
  IconDashboard, IconProfile, IconCourses, IconForum,
  IconSettings, IconLogout, IconCertificate, IconCreditCard, IconChevron,
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

const readCollapsed = () => {
  try { return localStorage.getItem('acd-sidebar-collapsed') === '1' } catch { return false }
}

const Navbar = () => {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(readCollapsed)

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c
      try { localStorage.setItem('acd-sidebar-collapsed', next ? '1' : '0') } catch { /* noop */ }
      return next
    })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const nombre = usuario?.email ? usuario.email.split('@')[0] : 'Invitado'

  return (
    <aside className={collapsed ? 'sidebar sidebar--collapsed' : 'sidebar'}>
      <button
        type="button"
        className="sidebar__toggle"
        onClick={toggle}
        aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
      >
        <IconChevron width={15} height={15} />
      </button>

      <div className="sidebar__brand">
        <span className="sidebar__logo-chip">
          <img src={logoAcadia} alt="Acadia" className="sidebar__logo" />
        </span>
      </div>

      <nav className="sidebar__nav">
        {grupos.map((grupo) => (
          <div className="sidebar__group" key={grupo.titulo}>
            <span className="sidebar__section">{grupo.titulo}</span>
            {grupo.items.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                title={collapsed ? label : undefined}
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

        <button type="button" className="sidebar__logout" onClick={handleLogout} title="Cerrar sesión">
          <IconLogout className="sidebar__icon" width={18} height={18} />
          <span className="sidebar__label">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}

export default Navbar
