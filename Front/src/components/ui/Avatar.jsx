// Avatar con la inicial del nombre sobre un círculo de color determinista.
// El color se deriva del nombre para que cada usuario tenga el suyo, estable.
const PALETTE = [
  'var(--course-yellow)',
  'var(--course-orange)',
  'var(--course-pink)',
  'var(--primary-light)',
  '#BBD4C2',
  '#C9C2E6',
]

const pickColor = (key = '') => {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % PALETTE.length
  return PALETTE[h]
}

// size: 'sm' | 'md' | 'lg'
const Avatar = ({ name = '', size = 'md' }) => {
  const label = String(name).trim()
  const initial = (label.charAt(0) || '?').toUpperCase()
  return (
    <span
      className={`avatar avatar--${size}`}
      style={{ backgroundColor: pickColor(label) }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}

export default Avatar
