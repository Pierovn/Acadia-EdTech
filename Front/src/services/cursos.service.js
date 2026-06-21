import API from './api'

export const getCursos = async () => {
  const { data } = await API.get('/cursos')
  return data
}

export const getCursoById = async (id) => {
  const { data } = await API.get(`/cursos/${id}`)
  return data
}

export const getLecciones = async (id) => {
  const { data } = await API.get(`/cursos/${id}/lecciones`)
  return data
}
