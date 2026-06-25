import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

const CountUp = ({ value = 0, duration = 1.1, decimals = 0, suffix = '' }) => {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, { duration, ease: 'easeOut', onUpdate: setDisplay })
    return () => controls.stop()
  }, [value, duration, reduce])

  return <>{display.toFixed(decimals)}{suffix}</>
}

export default CountUp
