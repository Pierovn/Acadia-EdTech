const ProgressBar = ({ value = 0, showLabel = true }) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className="progress">
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="progress__label">{pct}%</span>}
    </div>
  )
}

export default ProgressBar
