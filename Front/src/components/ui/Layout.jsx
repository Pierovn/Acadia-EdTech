import Navbar from './Navbar'
import Header from './Header'

// Layout de páginas internas: sidebar fijo + cabecera superior + área principal.
const Layout = ({ children }) => (
  <div className="layout">
    <Navbar />
    <div className="layout__col">
      <Header />
      <main className="layout__main">{children}</main>
    </div>
  </div>
)

export default Layout
