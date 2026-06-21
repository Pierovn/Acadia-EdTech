import API from './api'

export const getHilos = async (idCurso) => {
  const { data } = await API.get(`/foro/curso/${idCurso}`)
  return data
}

export const crearHilo = async ({ titulo, contenido, id_curso, etiquetas }) => {
  const { data } = await API.post('/foro', { titulo, contenido, id_curso, etiquetas })
  return data
}

export const responder = async (idHilo, contenido) => {
  const { data } = await API.post(`/foro/${idHilo}/responder`, { contenido })
  return data
}
