import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3000/api' })

// El token vive en el AuthContext (React state), NO en localStorage.
// AuthContext llama a setAuthToken() para inyectarlo en cada petición.
let authToken = null

export const setAuthToken = (token) => {
  authToken = token
}

API.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export default API
