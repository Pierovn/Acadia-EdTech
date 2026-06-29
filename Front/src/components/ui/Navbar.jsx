import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  IconDashboard, IconProfile, IconCourses, IconForum,
  IconSettings, IconLogout, IconCertificate, IconCreditCard, IconChevron,
} from './Icons'
import logoAcadia from '../../assets/logo-solo-icono.png'

const grupos = [
  {
    titulo: 'Menú',
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
  const { logout } = useAuth()
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
        <span className="sidebar__logo"><img src={logoAcadia} alt="Acadia" /></span>
        <span className="sidebar__brand-name">Acadia</span>
      </div>

      <nav className="sidebar__nav">
        {grupos.map((grupo, idx) => (
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
                <Icon className="sidebar__icon" width={20} height={20} />
                <span className="sidebar__label">{label}</span>
              </NavLink>
            ))}

            {idx === grupos.length - 1 && (
              <button
                type="button"
                className="sidebar__link sidebar__logout"
                onClick={handleLogout}
                title={collapsed ? 'Cerrar sesión' : undefined}
              >
                <IconLogout className="sidebar__icon" width={20} height={20} />
                <span className="sidebar__label">Cerrar sesión</span>
              </button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Navbar
