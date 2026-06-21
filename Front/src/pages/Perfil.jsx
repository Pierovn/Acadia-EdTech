import Layout from '../components/ui/Layout'
import Breadcrumb from '../components/ui/Breadcrumb'
import Avatar from '../components/ui/Avatar'
import { useAuth } from '../context/AuthContext'
import { IconProfile, IconMail } from '../components/ui/Icons'

const Perfil = () => {
  const { usuario } = useAuth()
  const nombre = usuario?.email ? usuario.email.split('@')[0] : 'Estudiante'

  return (
    <Layout>
      <Breadcrumb items={[{ label: 'Inicio', to: '/dashboard' }, { label: 'Perfil' }]} />

      <header className="page-head">
        <div>
          <h1 className="page-head__title">Mi perfil</h1>
          <p className="page-head__subtitle">Tu información de cuenta</p>
        </div>
      </header>

      <div className="profile-card">
        <Avatar name={nombre} size="lg" />
        <div className="profile-card__info">
          <h2 className="profile-card__name">{nombre}</h2>
          <p className="profile-card__row"><IconMail width={16} height={16} /> {usuario?.email || '—'}</p>
          <p className="profile-card__row"><IconProfile width={16} height={16} /> ID de alumno: {usuario?.id_alumno ?? '—'}</p>
        </div>
      </div>
    </Layout>
  )
}

export default Perfil
