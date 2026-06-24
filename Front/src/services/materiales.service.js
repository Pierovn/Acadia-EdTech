import API from './api'

export const getMaterialesPorCurso = async (idCurso) => {
  const { data } = await API.get(`/materiales/curso/${idCurso}`)
  return data
}

export const getMaterialesPorLeccion = async (idLeccion) => {
  const { data } = await API.get(`/materiales/leccion/${idLeccion}`)
  return data
}
