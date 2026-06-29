import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import { crearSuscripcion } from '../services/suscripciones.service'
import { IconCreditCard, IconSmartphone, IconShieldLock, IconCheckCircle, IconCheck, IconX } from '../components/ui/Icons'

const PLANES = [
  {
    id: 'MENSUAL',
    nombre: 'Plan Mensual',
    monto: 39,
    periodo: '/ mes',
    sub: 'Facturado cada mes',
    desc: 'Flexibilidad total para empezar a tu ritmo.',
    features: ['Acceso a todos los cursos', 'Certificado al completar cada curso', 'Cancela cuando quieras'],
  },
  {
    id: 'ANUAL',
    nombre: 'Plan Anual',
    monto: 290,
    periodo: '/ año',
    sub: '≈ S/ 24 al mes · ahorras ~38%',
    desc: 'El mejor valor para avanzar sin parar.',
    features: ['Todo lo del plan mensual', 'Ahorra frente al pago mensual', 'Soporte prioritario'],
    popular: true,
  },
  {
    id: 'UNICO',
    nombre: 'De por vida',
    monto: 690,
    periodo: 'pago único',
    sub: 'Un solo pago, para siempre',
    desc: 'Paga una vez y aprende sin límites.',
    features: ['Todo incluido, sin renovaciones', 'Acceso permanente a la plataforma', 'Incluye cursos futuros'],
  },
]

const METODOS = [
  { id: 'yape', label: 'Yape', Icon: IconSmartphone },
  { id: 'plin', label: 'Plin', Icon: IconSmartphone },
  { id: 'tarjeta', label: 'Tarjeta', Icon: IconCreditCard },
]

const soloDigitos = (v, max) => v.replace(/\D/g, '').slice(0, max)

const Checkout = () => {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [seleccion, setSeleccion] = useState(null)
  const [metodo, setMetodo] = useState('yape')
  const [telefono, setTelefono] = useState('')
  const [tarjeta, setTarjeta] = useState({ numero: '', titular: '', exp: '', cvv: '' })
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')
  const [confirmado, setConfirmado] = useState(null)

  const abrir = (plan) => {
    setSeleccion(plan)
    setMetodo('yape')
    setError('')
  }
  const cerrar = () => { if (!procesando) setSeleccion(null) }

  const handlePagar = async (e) => {
    e.preventDefault()
    setError('')
    setProcesando(true)
    try {
      const res = await crearSuscripcion({ plan: seleccion.id, monto: seleccion.monto })
      setConfirmado({ ...res, plan: seleccion })
      setSeleccion(null)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo procesar el pago')
    } finally {
      setProcesando(false)
    }
  }

  const planContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
  const planItem = { hidden: { opacity: 0, y: reduce ? 0 : 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

  if (confirmado) {
    return (
      <Layout>
        <motion.div className="pay-success" initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <motion.span
            className="pay-success__icon"
            initial={{ scale: reduce ? 1 : 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
          >
            <IconCheckCircle width={38} height={38} />
          </motion.span>
          <h1 className="pay-success__title">¡Suscripción activada!</h1>
          <p className="pay-success__text">
            Tu <strong>{confirmado.plan.nombre}</strong> ya está activo. ¡Bienvenido a Acadia Premium!
          </p>
          <p className="pay-success__text">Monto pagado: <strong>S/ {confirmado.plan.monto.toFixed(2)}</strong></p>
          <div className="pay-success__actions">
            <button type="button" className="acd-btn acd-btn--primary" onClick={() => navigate('/dashboard')}>
              Ir a mi dashboard
            </button>
            <Link to="/catalog" className="acd-btn acd-btn--ghost">Seguir explorando</Link>
          </div>
        </motion.div>
      </Layout>
    )
  }

  return (
    <Layout>
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Suscríbete a Acadia</h1>
          <p className="page-head__subtitle">Elige el plan que se ajuste a tu ritmo · pago simulado, sin cobros reales</p>
        </div>
      </header>

      <motion.div className="plans" variants={planContainer} initial="hidden" animate="show">
        {PLANES.map((p) => (
          <motion.article
            key={p.id}
            variants={planItem}
            className={p.popular ? 'plan plan--popular' : 'plan'}
          >
            {p.popular && <span className="plan__flag">Más popular</span>}
            <h2 className="plan__name">{p.nombre}</h2>
            <div className="plan__price">
              <span className="plan__amount">S/ {p.monto.toFixed(0)}</span>
              <span className="plan__period">{p.periodo}</span>
            </div>
            <span className="plan__sub">{p.sub}</span>
            <p className="plan__desc">{p.desc}</p>
            <ul className="plan__features">
              {p.features.map((f) => (
                <li key={f} className="plan__feature"><IconCheck width={16} height={16} /> {f}</li>
              ))}
            </ul>
            <button
              type="button"
              className={`acd-btn ${p.popular ? 'acd-btn--primary' : 'acd-btn--ghost'} plan__cta`}
              onClick={() => abrir(p)}
            >
              Elegir {p.nombre}
            </button>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>
        {seleccion && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={cerrar}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="modal__close" onClick={cerrar} aria-label="Cerrar">
                <IconX width={18} height={18} />
              </button>

              <h2 className="modal__title">Completa tu suscripción</h2>

              <div className="modal__summary">
                <span className="modal__summary-name">{seleccion.nombre}</span>
                <span className="modal__summary-price">
                  S/ {seleccion.monto.toFixed(2)} <small>{seleccion.periodo}</small>
                </span>
              </div>

              <div className="pay-methods">
                {METODOS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`pay-method${metodo === id ? ' pay-method--active' : ''}`}
                    onClick={() => setMetodo(id)}
                  >
                    <span className="pay-method__icon"><Icon width={20} height={20} /></span>
                    {label}
                  </button>
                ))}
              </div>

              <form className="pay-form" onSubmit={handlePagar}>
                {metodo === 'tarjeta' ? (
                  <>
                    <label className="pay-field">
                      <span className="pay-field__label">Número de tarjeta</span>
                      <input
                        type="text"
                        className="pay-input"
                        placeholder="4111 1111 1111 1111"
                        value={tarjeta.numero}
                        onChange={(e) => setTarjeta({ ...tarjeta, numero: soloDigitos(e.target.value, 16) })}
                        required
                      />
                    </label>
                    <label className="pay-field">
                      <span className="pay-field__label">Titular de la tarjeta</span>
                      <input
                        type="text"
                        className="pay-input"
                        placeholder="Nombre como aparece en la tarjeta"
                        value={tarjeta.titular}
                        onChange={(e) => setTarjeta({ ...tarjeta, titular: e.target.value })}
                        required
                      />
                    </label>
                    <div className="pay-row">
                      <label className="pay-field">
                        <span className="pay-field__label">Vencimiento</span>
                        <input
                          type="text"
                          className="pay-input"
                          placeholder="MM/AA"
                          value={tarjeta.exp}
                          onChange={(e) => setTarjeta({ ...tarjeta, exp: e.target.value.slice(0, 5) })}
                          required
                        />
                      </label>
                      <label className="pay-field">
                        <span className="pay-field__label">CVV</span>
                        <input
                          type="text"
                          className="pay-input"
                          placeholder="123"
                          value={tarjeta.cvv}
                          onChange={(e) => setTarjeta({ ...tarjeta, cvv: soloDigitos(e.target.value, 4) })}
                          required
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="pay-field">
                      <span className="pay-field__label">Número de celular ({metodo === 'yape' ? 'Yape' : 'Plin'})</span>
                      <input
                        type="tel"
                        className="pay-input"
                        placeholder="9XX XXX XXX"
                        value={telefono}
                        onChange={(e) => setTelefono(soloDigitos(e.target.value, 9))}
                        required
                      />
                    </label>
                    <p className="pay-note">
                      Abre tu app de {metodo === 'yape' ? 'Yape' : 'Plin'} y confirma el pago de S/ {seleccion.monto.toFixed(2)}.
                      Pasarela simulada: no se realizará ningún cobro real.
                    </p>
                  </>
                )}

                {error && <p className="acd-error">{error}</p>}

                <div className="checkout__total">
                  <span className="checkout__total-label">Total a pagar</span>
                  <span className="checkout__total-value">S/ {seleccion.monto.toFixed(2)}</span>
                </div>

                <button type="submit" className="acd-btn acd-btn--primary checkout__submit" disabled={procesando}>
                  {procesando ? 'Procesando…' : (<><IconCheck width={18} height={18} /> Confirmar pago</>)}
                </button>

                <p className="pay-secure">
                  <IconShieldLock width={14} height={14} /> Tus datos están protegidos
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default Checkout
