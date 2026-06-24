import API from './api'

export const getCalificaciones = async () => {
  const { data } = await API.get('/calificaciones')
  return data
}
