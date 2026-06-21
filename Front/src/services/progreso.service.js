import API from './api'

export const getProgreso = async (idCurso) => {
  const { data } = await API.get(`/progreso/${idCurso}`)
  return data
}

export const actualizarProgreso = async (idCurso, payload) => {
  const { data } = await API.put(`/progreso/${idCurso}`, payload)
  return data
}
