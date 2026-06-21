import API from './api'

export const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password })
  return data
}

export const register = async (nombre, apellido, email, password) => {
  const { data } = await API.post('/auth/register', { nombre, apellido, email, password })
  return data
}
