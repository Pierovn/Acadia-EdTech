import API from './api'

export const matricularse = async (idCurso) => {
  const { data } = await API.post('/matriculas', { id_curso: idCurso })
  return data
}

export const getMisCursos = async () => {
  const { data } = await API.get('/matriculas/mis-cursos')
  return data
}
