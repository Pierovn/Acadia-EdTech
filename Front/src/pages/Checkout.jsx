import { useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Layout from '../components/ui/Layout'
import { crearSuscripcion } from '../services/suscripciones.service'
import { IconCreditCard, IconSmartphone, IconShieldLock, IconCheckCircle, IconCheck } from '../components/ui/Icons'

const PLANES = [
  { id: 'MENSUAL', nombre: 'Plan Mensual', monto: 29.9, periodo: '/ mes', desc: 'Acceso completo a todos los cursos durante 30 días.' },
  { id: 'ANUAL', nombre: 'Plan Anual', monto: 299, periodo: '/ año', desc: 'Doce meses de acceso ilimitado con el mejor precio.' },
  { id: 'UNICO', nombre: 'Pago Único', monto: 199, periodo: 'una vez', desc: 'Acceso de por vida a la plataforma, sin renovaciones.', oferta: true },
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
  const { state } = useLocation()
  const compra = state && state.titulo ? state : null

  const [plan, setPlan] = useState(state?.plan || 'ANUAL')
  const [metodo, setMetodo] = useState('yape')
  const [telefono, setTelefono] = useState('')
  const [tarjeta, setTarjeta] = useState({ numero: '', titular: '', exp: '', cvv: '' })
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')
  const [confirmado, setConfirmado] = useState(null)

  const monto = useMemo(() => {
    if (compra) return Number(compra.monto)
    return PLANES.find((p) => p.id === plan)?.monto ?? 0
  }, [compra, plan])

  const resumen = compra
    ? { titulo: compra.titulo, detalle: 'Acceso completo al curso' }
    : (() => {
        const p = PLANES.find((x) => x.id === plan)
        return { titulo: p.nombre, detalle: p.desc }
      })()

  const handlePagar = async (e) => {
    e.preventDefault()
    setError('')
    setProcesando(true)
    try {
      const planFinal = compra ? (state?.plan || 'UNICO') : plan
      const res = await crearSuscripcion({ plan: planFinal, monto })
      setConfirmado(res)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo procesar el pago')
    } finally {
      setProcesando(false)
    }
  }

  const planContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
  const planItem = { hidden: { opacity: 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }

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
          <h1 className="pay-success__title">¡Pago confirmado!</h1>
          <p className="pay-success__text">
            {compra
              ? `Ya tienes acceso a "${compra.titulo}". ¡Disfruta tu aprendizaje!`
              : `Tu ${resumen.titulo.toLowerCase()} está activo. ¡Bienvenido a Acadia Premium!`}
          </p>
          <p className="pay-success__text">Monto pagado: <strong>S/ {monto.toFixed(2)}</strong></p>
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
          <h1 className="page-head__title">{compra ? 'Comprar curso' : 'Suscríbete a Acadia'}</h1>
          <p className="page-head__subtitle">Pago seguro y simulado · sin cobros reales</p>
        </div>
      </header>

      <motion.div className="checkout" initial={{ opacity: 0, y: reduce ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <section className="checkout__plans">
          {compra ? (
            <div className="order-summary">
              <h2 className="checkout__section-title">Tu compra</h2>
              <div className="order-summary__row">
                <span className="order-summary__name">{compra.titulo}</span>
                <span className="order-summary__price">S/ {monto.toFixed(2)}</span>
              </div>
              <p className="order-summary__detail">Acceso completo al curso, materiales y foro.</p>
            </div>
          ) : (
            <>
              <h2 className="checkout__section-title">Elige tu plan</h2>
              <motion.div className="plan-grid" variants={planContainer} initial="hidden" animate="show">
                {PLANES.map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    variants={planItem}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className={`plan-option${plan === p.id ? ' plan-option--active' : ''}${p.oferta ? ' plan-option--wide plan-option--featured' : ''}`}
                    onClick={() => setPlan(p.id)}
                  >
                    {p.oferta && <span className="plan-option__flag">Mejor precio</span>}
                    <span className="plan-option__name">{p.nombre}</span>
                    <span className="plan-option__price">
                      S/ {p.monto.toFixed(2)} <span className="plan-option__period">{p.periodo}</span>
                    </span>
                    <span className="plan-option__desc">{p.desc}</span>
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </section>

        <aside className="checkout__panel">
          <h2 className="checkout__section-title">Método de pago</h2>
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
                  Abre tu app de {metodo === 'yape' ? 'Yape' : 'Plin'} y confirma el pago de S/ {monto.toFixed(2)}.
                  Esta es una pasarela simulada: no se realizará ningún cobro real.
                </p>
              </>
            )}

            {error && <p className="acd-error">{error}</p>}

            <div className="checkout__total">
              <span className="checkout__total-label">Total a pagar</span>
              <span className="checkout__total-value">S/ {monto.toFixed(2)}</span>
            </div>

            <button type="submit" className="acd-btn acd-btn--primary checkout__submit" disabled={procesando}>
              {procesando ? 'Procesando…' : (
                <>
                  <IconCheck width={18} height={18} /> Confirmar pago
                </>
              )}
            </button>

            <p className="pay-secure">
              <IconShieldLock width={14} height={14} /> Tus datos están protegidos
            </p>
          </form>
        </aside>
      </motion.div>
    </Layout>
  )
}

export default Checkout
