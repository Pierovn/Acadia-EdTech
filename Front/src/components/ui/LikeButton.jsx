import { useState } from 'react'
import { IconHeart } from './Icons'

// Botón de like con animación de "latido" al activarse.
// Optimista en UI: el conteo cambia al instante; `onToggle` notifica al padre.
const LikeButton = ({ count = 0, liked = false, onToggle }) => {
  const [active, setActive] = useState(liked)
  const [n, setN] = useState(count)
  const [beat, setBeat] = useState(false)

  const handleClick = () => {
    const next = !active
    setActive(next)
    setN((v) => v + (next ? 1 : -1))
    if (next) {
      setBeat(true)
      setTimeout(() => setBeat(false), 320)
    }
    onToggle?.(next)
  }

  return (
    <button
      type="button"
      className={`like-btn${active ? ' like-btn--active' : ''}${beat ? ' like-btn--beat' : ''}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Quitar me gusta' : 'Me gusta'}
    >
      <IconHeart
        className="like-btn__icon"
        width={16}
        height={16}
        fill={active ? 'currentColor' : 'none'}
        stroke={active ? 'none' : 'currentColor'}
      />
      <span className="like-btn__count">{n}</span>
    </button>
  )
}

export default LikeButton
