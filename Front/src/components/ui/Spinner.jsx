// Estado de carga reutilizable. `center` lo centra en su contenedor.
const Spinner = ({ center = false, label }) => {
  const spinner = (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__ring" />
      {label && <span className="spinner__label">{label}</span>}
      <span className="sr-only">Cargando…</span>
    </div>
  )

  return center ? <div className="spinner__center">{spinner}</div> : spinner
}

export default Spinner
