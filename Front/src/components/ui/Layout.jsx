import Navbar from './Navbar'

// Layout de páginas internas: sidebar fijo + área principal.
const Layout = ({ children }) => (
  <div className="layout">
    <Navbar />
    <main className="layout__main">{children}</main>
  </div>
)

export default Layout
