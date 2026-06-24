import API from './api'

export const getSuscripciones = async () => {
  const { data } = await API.get('/suscripciones')
  return data
}

export const crearSuscripcion = async ({ plan, monto }) => {
  const { data } = await API.post('/suscripciones', { plan, monto })
  return data
}

export const actualizarEstadoSuscripcion = async (id, estado) => {
  const { data } = await API.put(`/suscripciones/${id}/estado`, { estado })
  return data
}

export const cancelarSuscripcion = async (id) => {
  const { data } = await API.delete(`/suscripciones/${id}`)
  return data
}
