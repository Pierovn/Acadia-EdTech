export const timeAgo = (fecha) => {
  if (!fecha) return ''
  const then = new Date(fecha).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Math.max(0, Date.now() - then)
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'hace un momento'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  if (d < 30) return `hace ${d} día${d > 1 ? 's' : ''}`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `hace ${mo} mes${mo > 1 ? 'es' : ''}`
  return `hace ${Math.floor(mo / 12)} año${Math.floor(mo / 12) > 1 ? 's' : ''}`
}

export const lastActivity = (hilo) => {
  const fechas = [new Date(hilo.fecha_creacion).getTime()]
  ;(hilo.respuestas || []).forEach((r) => fechas.push(new Date(r.fecha).getTime()))
  return Math.max(...fechas.filter((n) => !Number.isNaN(n)), 0)
}
