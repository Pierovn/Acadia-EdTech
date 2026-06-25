import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IconQuiz, IconCheck, IconCheckCircle } from './Icons'

const notaDe = (aciertos, total) => Math.round((aciertos / total) * 20)

const Quiz = ({ quiz, onAprobado, yaAprobado = false }) => {
  const reduce = useReducedMotion()
  const preguntas = quiz.preguntas
  const total = preguntas.length
  const [respuestas, setRespuestas] = useState({})
  const [enviado, setEnviado] = useState(false)

  const contestadas = Object.keys(respuestas).length
  const aciertos = useMemo(
    () => preguntas.reduce((s, p, i) => s + (respuestas[i] === p.correcta ? 1 : 0), 0),
    [respuestas, preguntas]
  )
  const nota = notaDe(aciertos, total)
  const aprobado = nota >= 11

  const elegir = (qi, oi) => {
    if (enviado) return
    setRespuestas((r) => ({ ...r, [qi]: oi }))
  }

  const enviar = () => {
    setEnviado(true)
    if (notaDe(aciertos, total) >= 11) onAprobado?.(notaDe(aciertos, total))
  }

  const reintentar = () => {
    setRespuestas({})
    setEnviado(false)
  }

  return (
    <section className="quiz">
      <header className="quiz__head">
        <span className="quiz__icon"><IconQuiz width={20} height={20} /></span>
        <div className="quiz__head-text">
          <h3 className="quiz__title">{quiz.titulo}</h3>
          <p className="quiz__sub">
            {enviado ? `Acertaste ${aciertos} de ${total}` : `${total} preguntas · necesitas 11/20 para aprobar`}
          </p>
        </div>
        {yaAprobado && !enviado && (
          <span className="quiz__done"><IconCheckCircle width={15} height={15} /> Aprobado</span>
        )}
      </header>

      <ol className="quiz__list">
        {preguntas.map((p, qi) => (
          <li key={qi} className="quiz__q">
            <p className="quiz__q-text"><span className="quiz__q-num">{qi + 1}</span> {p.pregunta}</p>
            <div className="quiz__opts">
              {p.opciones.map((op, oi) => {
                const elegida = respuestas[qi] === oi
                const esCorrecta = p.correcta === oi
                let estado = ''
                if (enviado) {
                  if (esCorrecta) estado = ' quiz__opt--correcta'
                  else if (elegida) estado = ' quiz__opt--incorrecta'
                } else if (elegida) {
                  estado = ' quiz__opt--sel'
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    className={`quiz__opt${estado}`}
                    onClick={() => elegir(qi, oi)}
                    disabled={enviado}
                  >
                    <span className="quiz__opt-mark" />
                    <span className="quiz__opt-label">{op}</span>
                    {enviado && esCorrecta && <IconCheck className="quiz__opt-ic" width={16} height={16} />}
                  </button>
                )
              })}
            </div>
          </li>
        ))}
      </ol>

      {!enviado ? (
        <div className="quiz__foot">
          <span className="quiz__progress">{contestadas} de {total} respondidas</span>
          <button
            type="button"
            className="acd-btn acd-btn--primary"
            onClick={enviar}
            disabled={contestadas < total}
          >
            Enviar respuestas
          </button>
        </div>
      ) : (
        <motion.div
          className={`quiz__result${aprobado ? ' quiz__result--ok' : ' quiz__result--fail'}`}
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="quiz__score">
            <span className="quiz__score-value">{nota}</span>
            <span className="quiz__score-max">/20</span>
          </div>
          <div className="quiz__result-text">
            <p className="quiz__result-title">
              {aprobado ? '¡Aprobaste el quiz final!' : 'Aún no alcanzas la nota mínima'}
            </p>
            <p className="quiz__result-sub">
              {aprobado
                ? 'Tu nota quedó registrada en tus calificaciones.'
                : 'Repasa las lecciones y vuelve a intentarlo.'}
            </p>
          </div>
          {!aprobado && (
            <button type="button" className="acd-btn acd-btn--ghost" onClick={reintentar}>
              Reintentar
            </button>
          )}
        </motion.div>
      )}
    </section>
  )
}

export default Quiz
