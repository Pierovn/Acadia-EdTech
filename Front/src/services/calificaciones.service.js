import API from './api'

export const getCalificaciones = async () => {
  const { data } = await API.get('/calificaciones')
  return data
}

export const crearCalificacion = async ({ id_matricula, nota, comentario }) => {
  const { data } = await API.post('/calificaciones', { id_matricula, nota, comentario })
  return data
}
